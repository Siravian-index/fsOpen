import React, { useState, useEffect } from 'react'
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import * as blogService from './services/blogs'
import * as localStorageUtility from './utils/localStorageUtility'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationConfig, setNotificationConfig] = useState({ type: '' })
  useEffect(() => {
    const populateBlogs = async () => setBlogs(await blogService.getAll())
    populateBlogs()
  }, [])

  useEffect(() => {
    let mounted = true
    const userFound = localStorageUtility.parseFromLocalStorage('currentUser')
    if (userFound && mounted) {
      setUser(userFound)
    }
    return () => (mounted = false)
  }, [])

  useEffect(() => {
    let mounted = true
    let id = setTimeout(() => {
      if (mounted) {
        setNotificationConfig({ type: '' })
      }
    }, 5000)
    return () => {
      mounted = false
      clearTimeout(id)
    }
  }, [notificationConfig.type])

  return (
    <>
      {!user && (
        <div>
          <Login notification={notificationConfig} setUser={setUser} setNotificationConfig={setNotificationConfig} />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification config={notificationConfig} />
          <UserDetails user={user} setUser={setUser} />
          <CreateBlog user={user} setBlogs={setBlogs} setNotificationConfig={setNotificationConfig} />
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </>
  )
}

export default App
