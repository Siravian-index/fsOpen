// imports
import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteItem from './components/AnecdoteItem'
import Notification from './components/Notification'

// constants
const NOTIFICATION_DELAY = 10

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const vote = (id) => {
    const anecdoteById = (id) => anecdotes.find((a) => a.id === id)
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification
        notification={notification}
        setNotification={setNotification}
        notificationDelay={NOTIFICATION_DELAY}
      />
      <Switch>
        <Route path='/create'>
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path='/about' component={About} />
        <Route path='/:id'>
          <AnecdoteItem anecdotes={anecdotes} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App
