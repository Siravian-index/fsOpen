import '../index.css'
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideNotification, selectNotificationObj } from '../reducers/notificationSlice'

const Notification = () => {
  const { message, error } = useSelector(selectNotificationObj)
  const dispatch = useDispatch()
  useEffect(() => {
    let mounted = true
    let id
    if (message && mounted) {
      // dispatch hideAction after 5 sec
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
    return () => {
      mounted = false
      clearTimeout(id)
    }
  }, [message])

  // error prop is just to add the style
  return <> {message && <div className={error ? 'error' : 'success'}>{message}</div>}</>
}

export default Notification
