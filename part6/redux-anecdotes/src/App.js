import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import * as anecdoteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      const anecdotes = await anecdoteService.getAnecdotes()
      console.log(anecdotes)
      dispatch(initAnecdotes(anecdotes))
    }
    init()
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
