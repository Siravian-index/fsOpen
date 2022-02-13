import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

// local imports
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import Dashboard from './components/Dashboard'
import UsersList from './components/UsersList'
import Login from './components/Login'
import { readUserFromLocalStorage, selectUserObj } from './reducers/userSlice'

// implement router (index and routes)
// create users services
// create usersSlice.js
// create usersBasicInfo component
// render accordingly
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
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <Route path='users' element={<UsersList />} />
          <Route path='create' element={<CreateBlog />} />
          <Route path='blogs' element={<BlogList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
// <>
//   {!user.token && (
//     <div>
//       <Login />
//     </div>
//   )}

//   {user.token && (
// <div>
// <h2>blogs</h2>
// <Notification />
// <UserDetails />
//   <CreateBlog />
//   <BlogList />
// </div>
//   )}
// </>
