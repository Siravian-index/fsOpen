const Persons = ({ list, filteredList, filter }) => {
  return (
    <>
      {filter.length > 0
        ? filteredList.map((p) => (
            <p key={p.name}>
              {p.name} {p.number}
            </p>
          ))
        : list.map((p) => (
            <p key={p.name}>
              {p.name} {p.number}
            </p>
          ))}
    </>
  )
}

export default Persons
