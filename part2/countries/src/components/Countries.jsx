const Countries = ({ countries, newFilter }) => {
  const filteredList = countries.filter((country) => country.name.common?.toLowerCase().includes(newFilter.toLowerCase()));
  if (!newFilter) return;
  if (filteredList.length > 10) return "Too many matches, specify another filter";
  if (filteredList.length > 1 && filteredList.length <= 10) return filteredList.map((country) => <div key={country.area}>{country.name.common}</div>);

  const country = filteredList[0];
  if (!country) return;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>language</h2>
      <ul>
        {Object.values(country.languages).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Countries;
