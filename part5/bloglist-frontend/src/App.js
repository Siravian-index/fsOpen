import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

// local imports
import Dashboard from './components/Dashboard'
import UsersList from './components/UsersList'
import Login from './components/Login'
import User from './components/User'
import Blog from './components/Blog'
import { readUserFromLocalStorage, selectUserObj } from './reducers/userSlice'
import Blogs from './components/Blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserObj)

  useEffect(() => {
    let mounted = true
    if (!user.token && mounted) {
      // create a hook to check if use is log in and handle it appropriately
      // in the custom hook place this first so the logic can follow
      // we check if no user is found then we redirect the user.
      // else the data is loaded
      dispatch(readUserFromLocalStorage())
    }
    return () => (mounted = false)
  }, [])

  return (
    <div className='font-mono bg-[#3B4252] overflow-auto '>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <Route path='users' element={<UsersList />}>
            <Route path=':id' element={<User />} />
          </Route>
          <Route path='blogs' element={<Blogs />}>
            <Route path=':id' element={<Blog />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
