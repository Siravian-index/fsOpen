import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const getPersons = async () => {
      const res = await axios.get('http://localhost:3001/persons')
      setPersons(res.data)
    }
    getPersons()
  }, [])

  const addContact = (e) => {
    e.preventDefault()
    const exists = persons.some((p) => p.name === newName)
    if (newName && newNumber) {
      if (!exists) {
        const newContact = { name: newName, number: newNumber, id: persons.length + 1 }
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
