import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Service from "./Service";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    Service.getPersons()
      .then((persons) => setPersons(persons))
      .catch((error) => console.log(error));
  });

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
      setFormData({ ...formData, name: "", number: "" });
    } else {
      Service.addPerson(newPerson).then((returnedPerson) =>
        setPersons([...persons, returnedPerson])
      );

      setFormData({ ...formData, name: "", number: "" });
    }
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
