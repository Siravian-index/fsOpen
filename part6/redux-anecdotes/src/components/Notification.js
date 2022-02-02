import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  // const anecdotes = useSelector(({ anecdotes }) => anecdotes.sort((a, b) => b.votes - a.votes))
  const message = useSelector(({ message }) => message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{message}</div>
}

export default Notification
