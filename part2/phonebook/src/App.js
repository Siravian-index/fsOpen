/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import C from './API/contacts'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageInfo, setMessageInfo] = useState({ show: false, msg: '', style: '' })

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

  useEffect(() => {
    let m = true
    let id = setTimeout(() => {
      if (m) {
        setMessageInfo({ show: false, msg: '', style: '' })
      }
    }, 3000)
    return () => {
      m = false
      clearTimeout(id)
    }
  }, [messageInfo])

  const toggleMessage = (msg, style) => {
    setMessageInfo({ show: true, msg, style })
  }

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const addContact = async (e) => {
    e.preventDefault()
    try {
      const found = persons.find((p) => p.name === newName)
      if (newName.length > 3 && newNumber.length > 8) {
        const newContact = { name: newName, number: newNumber }
        if (!found) {
          const res = await C.createContact(newContact)
          if (res.data) {
            toggleMessage(res.msg, 'green')
            setPersons((prev) => [...prev, res.data])
            clearInputs()
          } else {
            toggleMessage(res.msg, 'red')
          }
        } else {
          const confirmation = confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
          if (confirmation) {
            const res = await C.updateContacts(found.id, newContact)
            if (res.data) {
              toggleMessage(res.msg, 'green')
              setPersons((prev) => prev.map((p) => (p.id !== found.id ? p : res.data)))
              clearInputs()
            } else {
              toggleMessage(res.msg, 'red')
            }
          }
        }
      } else {
        if (newName.length < 3) {
          toggleMessage('name must be at least 3 characters long', 'red')
        }
        if (newNumber.length < 8) {
          toggleMessage('number must be at least 8 characters long', 'red')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeContact = async (id) => {
    const found = persons.find((p) => p.id === id)
    if (found) {
      const concent = confirm(`Delete ${found.name}?`)
      if (concent) {
        const res = await C.deleteContact(id)
        if (res.data) {
          toggleMessage(res.msg, 'green')
          setPersons((prev) => prev.filter((p) => p.id !== id))
        } else {
          toggleMessage(res.msg, 'red')
        }
      }
    } else {
      toggleMessage('contact not found', 'red')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message messageInfo={messageInfo} />
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
