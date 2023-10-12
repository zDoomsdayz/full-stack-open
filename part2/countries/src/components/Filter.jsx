const Filter = ({ newFilter, handleFilteredCountry }) => {
  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilteredCountry} />
    </div>
  );
};

export default Filter;
