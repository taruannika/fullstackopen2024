const Filter = ({ clearFilter, formData, handleChange }) => {
  return (
    <div>
      filter shown with
      <input
        name="filter"
        type="text"
        value={formData.filter}
        onChange={handleChange}
      />
      <button onClick={clearFilter}>Clear</button>
    </div>
  );
};

export default Filter;
