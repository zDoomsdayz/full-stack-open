import Person from "./Person";

const Persons = ({ deletePerson, persons, newFilter }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name?.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person) => (
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id, person.name)} />
        ))}
    </ul>
  );
};

export default Persons;
