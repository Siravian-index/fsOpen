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

  return (
    <>
      {!user && (
        <div>
          {/* missing notification */}
          <Login setUser={setUser} />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          {/* missing notification */}
          <Notification />
          <UserDetails user={user} setUser={setUser} />
          {/* missing notification */}
          <CreateBlog user={user} setBlogs={setBlogs} />
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </>
  )
}

export default App
