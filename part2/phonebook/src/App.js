import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addContact = (e, obj, setObj, name, setName) => {
    e.preventDefault()
    const exists = persons.some((p) => p.name === newName)
    if (!exists) {
      const newContact = { name: newName }
      setPersons((prev) => [...prev, newContact])
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => addContact(e)}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  )
}
export default App
