const PersonForm = ({ name, setName, number, setNumber, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor=''>
          number: <input type='number' value={number} onChange={(e) => setNumber(e.target.value)} />
        </label>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
