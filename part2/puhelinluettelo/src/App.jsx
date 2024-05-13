import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    filter: "",
  });

  const personsToShow = formData.filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(formData.filter.toLowerCase())
      )
    : persons;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const clearFilter = () => {
    setFormData({ ...formData, filter: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: formData.name, number: formData.number };

    if (
      persons
        .map((person) => person.name.toLowerCase())
        .includes(newPerson.name.toLowerCase())
    ) {
      alert(`${newPerson.name} is already added to phonebook`);
      setFormData({ name: "", number: "" });
      return;
    }

    setPersons([...persons, newPerson]);
    setFormData({ ...formData, name: "", number: "" });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          name="filter"
          type="text"
          value={formData.filter}
          onChange={handleChange}
        />
        <button onClick={clearFilter}>Clear</button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Add new</h2>
        <div>
          name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          number:
          <input
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
