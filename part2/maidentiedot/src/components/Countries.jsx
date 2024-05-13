const Countries = ({ countries, handleSelected }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleSelected(country.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
