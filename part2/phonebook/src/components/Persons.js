import Person from './Person'
const Persons = ({ list, filter, removeContact }) => {
  return (
    <>
      {list
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p) => (
          <Person person={p} key={p.id} removeContact={removeContact} />
        ))}
    </>
  )
}

export default Persons
