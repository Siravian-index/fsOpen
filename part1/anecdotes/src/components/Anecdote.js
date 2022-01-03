const Anecdote = ({ anecdotes, votes, index }) => {
  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>
        has {votes[index]} {votes[index] === 1 ? 'vote' : 'votes'}
      </p>
    </>
  )
}

export default Anecdote
