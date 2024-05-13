import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Service from "./Service";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    hasError: false,
  });

  useEffect(() => {
    Service.getPersons()
      .then((persons) => setPersons(persons))
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    let timer = null;

    if (notification.message) {
      timer = setTimeout(() => {
        setNotification({ ...notification, message: null, hasError: false });
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [notification]);

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

    const nameList = persons.map((person) => person.name.toLowerCase());
    const existingPerson = nameList.includes(newPerson.name.toLowerCase());

    if (!existingPerson) {
      Service.addPerson(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNotification({
            ...notification,
            message: `Added ${newPerson.name}`,
            hasError: false,
          });
        })
        .catch((error) => console.log(error));
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already in phonebook. Change old number to new one`
        )
      ) {
        const person = persons.find(
          (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
        );

        const updatedPerson = { ...person, number: newPerson.number };
        Service.updatePerson(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((n) => (n.id === person.id ? returnedPerson : n))
            );
            setNotification({
              ...notification,
              message: `Updated ${updatedPerson.name}`,
              hasError: false,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setFormData({ ...formData, name: "", number: "" });
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ? `)) {
      setPersons(persons.filter((person) => person.id !== id));
      Service.deletePerson(id);
      setNotification({
        ...notification,
        message: `Deleted ${person.name}`,
        hasError: false,
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
