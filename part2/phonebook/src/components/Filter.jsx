const Filter = ({ newFilter, handleFilteredPerson }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilteredPerson} />
    </div>
  );
};

export default Filter;
