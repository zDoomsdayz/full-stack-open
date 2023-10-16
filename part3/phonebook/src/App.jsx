import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorColor, setErrorColor] = useState("red");

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .deletePerson(id)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)));
        })
        .catch((error) => {
          setErrorColor("red");
          setErrorMessage(`the person '${name}' was already deleted from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName) return;

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personInfo = persons.find((n) => n.name === newName);
        const changedPersonInfo = { ...personInfo, number: newNumber };

        phonebookService
          .update(changedPersonInfo.id, changedPersonInfo)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== changedPersonInfo.id ? person : returnedPerson)));
            setErrorColor("yellow");
            setErrorMessage(`the person '${changedPersonInfo.name}' was updated successfully`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorColor("red");
            setErrorMessage(`the person '${changedPersonInfo.name}' already exist`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => n.id !== changedPersonInfo.id));
          });

        setNewName("");
        setNewNumber("");
      }
      return;
    }
    setErrorColor("green");
    setErrorMessage(`Added ${newName}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    phonebookService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setNewFilter("");
    });
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilteredPerson = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorColor={errorColor} />
      <Filter newFilter={newFilter} handleFilteredPerson={handleFilteredPerson} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons deletePerson={deletePerson} persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
