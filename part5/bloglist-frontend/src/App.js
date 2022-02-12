import React from 'react'
import { useSelector } from 'react-redux'
// local imports
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import { selectUserObj } from './reducers/userSlice'

// add user to localStorage
// clear user from localStorage
const App = () => {
  // const [user, setUser] = useState(null)
  // move this to redux store and instead of props use useSelector
  const user = useSelector(selectUserObj)
  console.log(user)
  // useEffect(() => {
  //   let mounted = true
  //   const userFound = localStorageUtility.parseFromLocalStorage('currentUser')
  //   if (userFound && mounted) {
  //     // setUser(userFound)
  //   }
  //   return () => (mounted = false)
  // }, [])
  return (
    <>
      {user && (
        <div>
          <Login />
        </div>
      )}

      {user.token && (
        <div>
          <h2>blogs</h2>
          <Notification />
          {/* setUser not defined */}
          <UserDetails user={user} />
          <CreateBlog user={user} />
          <BlogList user={user} />
        </div>
      )}
    </>
  )
}

export default App
