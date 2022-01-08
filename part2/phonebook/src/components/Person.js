const Person = ({ person, removeContact }) => {
  return (
    <>
      <div>
        <span>
          {person.name} {person.number}
        </span>{' '}
        <button onClick={() => removeContact(person.id)}>delete</button>
      </div>
    </>
  )
}

export default Person
