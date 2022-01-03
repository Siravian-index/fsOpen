import Button from './components/Button'
import React, { useState } from 'react'
import Title from './components/Title'
import getRandomNum from './utils/getRandomNum'
import initializeArr from './utils/initializeArr'
import Anecdote from './components/Anecdote'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initializeArr(anecdotes, 0))

  const getNextAnecdote = () => {
    setSelected(getRandomNum(anecdotes))
  }
  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const mostVotedAnecdote = (array) => {
    const mostVoted = Math.max(...array)
    const index = array.indexOf(mostVoted)
    return index
  }
  const checkVotes = (array) => {
    let current = Math.max(...array)
    return current > 0
  }

  return (
    <div>
      <Title title={'Anecdote of the day'} />
      <Anecdote anecdotes={anecdotes} votes={votes} index={selected} />
      <div>
        <Button text={'vote'} callback={voteAnecdote} />
        <Button text={'next anecdote'} callback={getNextAnecdote} />
      </div>
      <Title title={'Anecdote with most votes'} />
      {checkVotes(votes) && <Anecdote anecdotes={anecdotes} votes={votes} index={mostVotedAnecdote(votes)} />}
    </div>
  )
}

export default App
