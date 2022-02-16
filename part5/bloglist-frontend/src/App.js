import React from 'react'
import { Route, Routes } from 'react-router-dom'

// local imports
import Dashboard from './components/Dashboard'
import UsersList from './components/UsersList'
import Login from './components/Login'
import User from './components/User'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import { useAuth } from './hooks/useAuth'

const App = () => {
  useAuth()
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
