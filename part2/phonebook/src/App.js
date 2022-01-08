import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import getContacts from './API/contacts/getContacts'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let m = true
    const setPersonsState = async () => {
      const contacts = await getContacts()
      if (m) {
        setPersons(contacts)
      }
    }
    setPersonsState()
    return () => (m = false)
  }, [])

  const addContact = (e) => {
    e.preventDefault()
    const exists = persons.some((p) => p.name === newName)
    if (newName && newNumber) {
      if (!exists) {
        const newContact = { name: newName, number: newNumber, id: persons.length + 1 }
        // axios create contact
        setPersons((prev) => [...prev, newContact])
        setNewName('')
        setNewNumber('')
      } else {
        alert(`${newName} is already added to phonebook`)
      }
    } else {
      alert(`name and number must be filled`)
    }
  }

  // const removeContact = (e) => {
  //   e.preventDefault()
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={addContact}
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons list={persons} filter={filter} />
    </div>
  )
}
export default App
