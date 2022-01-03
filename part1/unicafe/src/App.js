import React, { useState } from 'react'
import ButtonsList from './components/ButtonsList'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseCounter = (callback) => {
    callback((prev) => prev + 1)
  }

  return (
    <>
      <ButtonsList setStates={{ setGood, setNeutral, setBad }} callback={increaseCounter} />
      <Statistics stats={{ good, neutral, bad }} />
    </>
  )
}

export default App
