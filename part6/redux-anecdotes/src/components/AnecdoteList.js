import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { votedMessage } from '../reducers/messageReducer'
const AnecdoteList = () => {
  // gets the state and sorts it desc according to likes
  const anecdotes = useSelector(({ anecdotes }) => anecdotes.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(votedMessage(anecdote.content))
  }
  return (
    <>
      {anecdotes.map((anecdote) => (
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
