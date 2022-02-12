import React, { useState, useEffect } from 'react'
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import * as localStorageUtility from './utils/localStorageUtility'

const App = () => {
  const [user, setUser] = useState(null)
  // move this to redux store and instead of props use useSelector
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
          <Login setUser={setUser} />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <UserDetails user={user} setUser={setUser} />
          <CreateBlog user={user} />
          <BlogList user={user} />
        </div>
      )}
    </>
  )
}

export default App
