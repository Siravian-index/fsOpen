import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  // pass a ref to the input and take the data and reset it
  const handleAddAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      {/* keep the form uncontrolled */}
      <form onSubmit={(e) => handleAddAnecdote(e)}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
