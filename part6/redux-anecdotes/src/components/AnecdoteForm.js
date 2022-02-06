// refactored
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/messageReducer'

// NOTE
// went back in time to use connect instead of the modern way just to learn it.
const AnecdoteForm = (props) => {
  // refactored
  // const dispatch = useDispatch()
  // pass a ref to the input and take the data and reset it
  const handleAddAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    // refactored
    // dispatch(addAnecdote(anecdote))
    // dispatch(addedMessage(anecdote, 10))
    //-----
    props.addAnecdote(anecdote)
    // props.addedMessage(anecdote, 10)
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

// since we are not getting any state from the store in this component,
// we need to pass null as the first parameter
// const mapStateToProps = {}
const mapDispatchToPros = {
  addAnecdote,
  createNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToPros)(AnecdoteForm)
export default ConnectedAnecdoteForm
