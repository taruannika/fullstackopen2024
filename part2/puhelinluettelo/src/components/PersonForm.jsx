const PersonForm = ({ handleChange, handleSubmit, formData }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new</h2>
      <div>
        name:
        <input name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        number:
        <input name="number" value={formData.number} onChange={handleChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
