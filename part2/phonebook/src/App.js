import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import C from './API/contacts'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let m = true
    const setPersonsState = async () => {
      const contacts = await C.getContacts()
      if (m) {
        setPersons(contacts)
      }
    }
    setPersonsState()
    return () => (m = false)
  }, [])

  const addContact = async (e) => {
    e.preventDefault()
    const exists = persons.some((p) => p.name === newName)
    if (newName && newNumber) {
      if (!exists) {
        const newContact = { name: newName, number: newNumber }
        const res = await C.createContact(newContact)
        if (res.data) {
          setPersons((prev) => [...prev, res.data])
          setNewName('')
          setNewNumber('')
        } else {
          alert(res.msg)
        }
      } else {
        alert(`${newName} is already added to phonebook`)
      }
    } else {
      alert(`name and number must be filled`)
    }
  }

  const removeContact = async (id) => {
    const found = persons.find((p) => p.id === id)
    if (found) {
      // eslint-disable-next-line no-restricted-globals
      const concent = confirm(`Delete ${found.name}?`)
      if (concent) {
        const res = await C.deleteContact(id)
        if (res.data) {
          setPersons((prev) => prev.filter((p) => p.id !== id))
        } else {
          alert(res.msg)
        }
      }
    }
  }

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
      <Persons list={persons} filter={filter} removeContact={removeContact} />
    </div>
  )
}
export default App
