const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <label>
        filter shown with <input value={filter} onChange={(e) => setFilter(e)} />
      </label>
    </div>
  )
}

export default Filter
