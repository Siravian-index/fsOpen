import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addedMessage } from '../reducers/messageReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  // pass a ref to the input and take the data and reset it
  const handleAddAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    // dispatch addedMessage
    dispatch(addedMessage(anecdote))
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
