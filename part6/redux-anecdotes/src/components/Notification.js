import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideMessage } from '../reducers/messageReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector(({ message }) => message)
  useEffect(() => {
    let mounted = true
    let id
    if (mounted) {
      id = setTimeout(() => {
        dispatch(hideMessage())
      }, 5000)
    }
    return () => {
      mounted = false
      clearTimeout(id)
    }
  }, [message, dispatch])
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={message ? style : null}>{message}</div>
}

export default Notification
