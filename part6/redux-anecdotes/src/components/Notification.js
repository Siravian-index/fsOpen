import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const message = useSelector(({ message }) => message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={message && style}>{message}</div>
}

export default Notification