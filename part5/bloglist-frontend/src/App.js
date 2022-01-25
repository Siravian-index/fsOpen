import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import UserDetails from './components/UserDetails'
import * as blogService from './services/blogs'
import * as loginService from './services/login'
import * as localStorageUtility from './utils/localStorageUtility'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [credentials, setCredentials] = useState({ username: 'davinchi', password: 'testing123' })
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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

  const handleLogin = async (e, credentials) => {
    e.preventDefault()
    const userData = await loginService.login(credentials)
    if (userData) {
      setUser(userData)
      localStorageUtility.saveToLocalStorage('currentUser', userData)
      setCredentials({ username: '', password: '' })
    } else {
      // make a banner
      console.log('user not found')
    }
  }

  const handleLogout = (e) => {
    localStorageUtility.deleteFromLocalStorage('currentUser')
    setUser(null)
  }

  const handleNewBlog = (e, newBlog) => {
    e.preventDefault()
  }

  return (
    <>
      {!user && (
        <div>
          <Login login={{ credentials, setCredentials, handleLogin }} />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <UserDetails user={user} logout={handleLogout} />
          <CreateBlog blog={{ newBlog, setNewBlog, handleNewBlog }} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
