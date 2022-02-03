import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { votedMessage } from '../reducers/messageReducer'

const AnecdoteList = () => {
  // gets the state and sorts it desc according to likes
  // I am not sure if this sorting on the callback is better than sorting on the return.
  // or maybe it does not matter since it must always run?
  // const anecdotes = useSelector(({ anecdotes }) => anecdotes.sort((a, b) => b.votes - a.votes))
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(votedMessage(anecdote.content))
  }
  // sort, filter, map
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter((a) => a.content.toLowerCase().includes(filter))
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
