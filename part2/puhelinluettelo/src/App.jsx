import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1231244" },
  ]);
  const [formData, setFormData] = useState({ name: "", number: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
    setFormData({ name: "", number: "" });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
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
      {persons.map((person) => (
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
