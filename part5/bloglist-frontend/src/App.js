import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

// local imports
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import Dashboard from './components/Dashboard'
import UsersList from './components/UsersList'
import Login from './components/Login'
import User from './components/User'
import Blog from './components/Blog'
import { readUserFromLocalStorage, selectUserObj } from './reducers/userSlice'

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
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <Route path='users' element={<UsersList />}>
            <Route path=':id' element={<User />} />
          </Route>
          <Route path='create' element={<CreateBlog />} />
          {/* this blogList could go in the default / */}
          <Route path='blogs' element={<BlogList />}>
            <Route path=':id' element={<Blog />} />
          </Route>
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
