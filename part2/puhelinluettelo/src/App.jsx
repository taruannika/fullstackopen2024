import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
      <Filter
        clearFilter={clearFilter}
        formData={formData}
        handleChange={handleChange}
      />
      <h3>Add New</h3>
      <PersonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
