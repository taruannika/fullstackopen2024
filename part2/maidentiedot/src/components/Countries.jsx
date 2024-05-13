import Country from "./Country";

const Countries = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

export default Countries;
