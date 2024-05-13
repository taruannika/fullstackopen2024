import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const countriesToShow = countries?.filter((country) =>
    filter
      ? country.name.common.toLowerCase().includes(filter.toLowerCase())
      : null
  );

  const handleSelected = (name) => {
    const selected = countriesToShow.find((c) => c.name.common === name);
    setSelected(selected);
    setFilter("");
  };

  useEffect(() => {
    if (filter) {
      setSelected(null);
    }
  }, [filter]);

  const display = () => {
    switch (true) {
      case selected !== null:
        return <Country country={selected} />;
      case countriesToShow?.length === 1:
        return <Country country={countriesToShow[0]} />;
      case countriesToShow?.length <= 10 && countries.length > 1:
        return (
          <Countries
            countries={countriesToShow}
            handleSelected={handleSelected}
          />
        );
      case countriesToShow?.length > 10:
        return <p>Too Many matches, specify another filter</p>;
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
