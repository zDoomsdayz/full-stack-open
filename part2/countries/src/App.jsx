import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
      console.log(initialCountries);
    });
  }, []);

  const handleFilteredCountry = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Filter newFilter={newFilter} handleFilteredCountry={handleFilteredCountry} />
      <Countries countries={countries} newFilter={newFilter} />
    </div>
  );
};

export default App;
