import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          appid: import.meta.env.VITE_APIKEY,
          lat: country.capitalInfo.latlng[0],
          lon: country.capitalInfo.latlng[1],
          units: "metric",
        },
      })
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error));
  }, [country.capitalInfo.latlng]);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />

      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature {weather.main.temp} celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].main}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
