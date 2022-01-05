import Person from './Person'
const Persons = ({ list, filter }) => {
  return (
    <>
      {list
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p) => (
          <Person person={p} key={p.id} />
        ))}
    </>
  )
}

export default Persons
