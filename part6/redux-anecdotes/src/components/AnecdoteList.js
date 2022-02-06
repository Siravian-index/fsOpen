import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()
  // copies the array so we can sort it later.
  const mutableAnecdotes = anecdotes.slice()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    // dispatch(votedMessage(anecdote.content, 5))
    dispatch(createNotification(anecdote.content, 5))
  }
  // sort, filter, map
  return (
    <>
      {mutableAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
