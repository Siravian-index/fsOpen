import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// local imports
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import { readUserFromLocalStorage, selectUserObj } from './reducers/userSlice'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserObj)
  useEffect(() => {
    let mounted = true
    if (!user.token && mounted) {
      dispatch(readUserFromLocalStorage())
    }
    return () => (mounted = false)
  }, [])
  return (
    <>
      {!user.token && (
        <div>
          <Login />
        </div>
      )}

      {user.token && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <UserDetails />
          <CreateBlog />
          <BlogList />
        </div>
      )}
    </>
  )
}

export default App
