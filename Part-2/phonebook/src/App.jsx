import { useEffect, useRef, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";
import phonebook from "./services/phonebook";

const App = () => {
  const nameRef = useRef()
  const numberRef = useRef()
  const [personList, setPersonList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false)
  const [filterVal, setFilterVal] = useState("")

  //? useEffect to fetch the intital data from the json.server
  useEffect(() => {
    phonebook.getAll().then((data) => setPersonList(data))
  }, []);

  //? filter the person list
  const filteredItem = personList.filter((p) => p.name.toLowerCase().includes(filterVal.toLowerCase()))

  //? handles form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const person = {
      id: `${Date.now()}`,
      name: nameRef.current.value,
      number: numberRef.current.value,
    };

    const checkPerson = personList.find((p) => p.name === person.name);
    const checkNumber = personList.find((p) => p.number === person.number);

    //? check if person already exists
    if (checkPerson?.name === person.name) {

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        phonebook
          .update(checkPerson.id, person)
          .then((returnedPerson) =>
            setPersonList(personList.map(p => p.id !== checkPerson.id ? p : returnedPerson)));

        setError(false)
        setNotification(`Updated ${person.name}`);
      }

      //? check if number already exists
    } else if (checkNumber?.number === person.number) {

      if (window.confirm(`${person.number} is already added to phonebook, replace the old name with a new one?`)) {
        phonebook
          .update(checkNumber.id, person)
          .then((returnedPerson) =>
            setPersonList(personList.map(p => p.id !== checkNumber.id ? p : returnedPerson)));

        setError(false)
        setNotification(`Updated ${person.name}`);
      }

      //? create new person
    } else {
      phonebook
        .create(person)
        .then((returnedPerson) =>
          setPersonList(personList.concat(returnedPerson)));

      setError(false)
      setNotification(`Added ${person.name}`);
    }

    nameRef.current.value = "";
    numberRef.current.value = "";
    setTimeout(() => setNotification(null), 3000);
  };

  //? delete a person from the server
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebook
        .remove(person.id)
        .then(() =>
          setPersonList(personList.filter((p) => p.id !== person.id))
        );

      setError(true);
      setNotification(`Deleted ${person.name}`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <main>
      <h1>Phonebook</h1>
      <Notification message={notification} error={error} />
      <Filter filterVal={filterVal} setFilterVal={setFilterVal} />
      <PersonForm
        nameRef={nameRef}
        numberRef={numberRef}
        handleSunmit={handleSubmit}
      />
      <h2>Contact list</h2>
      {filteredItem.map((person) => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </main>
  );
};

export default App;
