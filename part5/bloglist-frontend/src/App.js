import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import * as blogService from './services/blogs'
import * as loginService from './services/login'
import * as localStorageUtility from './utils/localStorageUtility'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [notificationConfig, setNotificationConfig] = useState({ type: '' })
  const [showBlogForm, setShowBlogForm] = useState(false)
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

  const handleLogin = async (e, credentials) => {
    e.preventDefault()
    const userData = await loginService.login(credentials)
    if (userData) {
      setUser(userData)
      localStorageUtility.saveToLocalStorage('currentUser', userData)
      setCredentials({ username: '', password: '' })
    } else {
      //banner
      setNotificationConfig({ type: 'loginError' })
      console.log('user not found')
    }
  }

  const handleLogout = () => {
    localStorageUtility.deleteFromLocalStorage('currentUser')
    setUser(null)
  }

  const handleNewBlog = async (e, newBlog) => {
    e.preventDefault()
    const blog = await blogService.createOne(newBlog, user.token)
    if (blog) {
      setBlogs((prev) => [...prev, blog])
      setNewBlog({ title: '', author: '', url: '' })
      // banner
      setNotificationConfig({ type: 'blogSuccess', blog })
      // hide form
      setShowBlogForm(!showBlogForm)
    } else {
      // banner
      setNotificationConfig({ type: 'blogError' })
      console.log('bad request')
    }
  }

  return (
    <>
      {!user && (
        <div>
          <Login login={{ credentials, setCredentials, handleLogin }} notification={notificationConfig} />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification config={notificationConfig} />
          <UserDetails user={user} logout={handleLogout} />
          {showBlogForm && <CreateBlog blog={{ newBlog, setNewBlog, handleNewBlog }} />}
          <div>
            <button onClick={() => setShowBlogForm(!showBlogForm)}>{showBlogForm ? 'cancel' : 'open'}</button>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
