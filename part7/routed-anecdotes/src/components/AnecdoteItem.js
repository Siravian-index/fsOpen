import { useParams } from 'react-router'

const AnecdoteItem = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find((a) => a.id === id)
  return (
    <div>
      {anecdote ? (
        <>
          <h3>
            {anecdote.content} by {anecdote.author}
          </h3>
          <p>has {anecdote.votes} votes</p>
          <p>
            for more info see{' '}
            <a href={anecdote.info} target='_blank' rel='noreferrer'>
              {anecdote.info}
            </a>
          </p>
        </>
      ) : (
        <h4>anecdote not found</h4>
      )}
    </div>
  )
}

export default AnecdoteItem

// {
//   content: 'If it hurts, do it more often',
//   author: 'Jez Humble',
//   info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
//   votes: 0,
//   id: '1',
// },
