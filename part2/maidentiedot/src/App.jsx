import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  const countriesToShow = countries?.filter((c) =>
    filter ? c.name.common.toLowerCase().includes(filter.toLowerCase()) : null
  );

  const display = () => {
    switch (true) {
      case countriesToShow.length <= 10 && countries.length > 1:
        return <Countries countries={countriesToShow} />;
      case countriesToShow.length > 10:
        return <p>Too Many matches, specify another filter</p>;
      case countriesToShow.length === 1:
        console.log("One country");
        return <Country country={countriesToShow[0]} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  if (!countries) return null;

  return (
    <div>
      <div>
        Find Countries
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      {display()}
    </div>
  );
};

export default App;
