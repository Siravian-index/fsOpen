import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { votedMessage } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()
  // copies the array so we can sort it later.
  const mutableAnecdotes = anecdotes.slice()
  const handleVote = (id) => {
    dispatch(vote(id))
    const anecdote = mutableAnecdotes.find((a) => a.id === id)
    dispatch(votedMessage(anecdote.content))
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
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
