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
  return (
    <>{message && <div className={`m-2 p-2 text-2xl ${error ? 'text-[#BF616A]' : 'text-[#A3BE8C]'}`}>{message}</div>}</>
  )
}

export default Notification
