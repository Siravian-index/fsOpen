import React, { useState } from 'react'
import ButtonsList from './components/ButtonsList'
import Statistics from './components/Statistics'
import Title from './components/Title'
import Warning from './components/Warning'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = { good, neutral, bad }
  const increaseCounter = (callback) => {
    callback((prev) => prev + 1)
  }

  return (
    <>
      <Title title={'give feedback'} />
      <ButtonsList setStates={{ setGood, setNeutral, setBad }} callback={increaseCounter} />
      <Title title={'Statistics'} />
      {good || neutral || bad ? <Statistics stats={stats} /> : <Warning />}
    </>
  )
}

export default App
