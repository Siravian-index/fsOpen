import { useEffect } from 'react'

const Notification = ({ notification, setNotification, notificationDelay }) => {
  const MILLISECONDS = 1000

  useEffect(() => {
    let m = true
    let id
    if (m) {
      id = setTimeout(() => {
        setNotification('')
      }, notificationDelay * MILLISECONDS)
    }
    return () => {
      m = false
      clearTimeout(id)
    }
  }, [notification, setNotification, notificationDelay])

  return <>{notification && <div>a new anecdote {notification} created!</div>}</>
}

export default Notification
