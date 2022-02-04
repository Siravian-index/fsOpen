import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addedMessage } from '../reducers/messageReducer'
import * as anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  // pass a ref to the input and take the data and reset it
  const handleAddAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.postAnecdote(anecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(addedMessage(newAnecdote.content))
  }
  return (
    <>
      <form onSubmit={(e) => handleAddAnecdote(e)}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
