import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
// local
import { selectUserFromArray } from '../reducers/usersSlice'
const User = () => {
  const navigate = useNavigate()
  const [userId, setShowOutlet] = useOutletContext()
  const user = useSelector((state) => selectUserFromArray(state, userId))
  // returns the user to the /users page if no specific user was found
  useEffect(() => {
    if (!user) {
      navigate('/users/')
      setShowOutlet(false)
    }
  }, [user])

  const blogs = user.blogs.map((blog) => (
    <ul key={blog.id}>
      <li className='hover:underline'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </li>
    </ul>
  ))
  return (
    <>
      {user && (
        <div className='flex flex-col justify-center items-center text-[#E5E9F0]'>
          <h2>{user.username}</h2>
          <h3>added blogs:</h3>
          {user.blogs.length > 0 ? blogs : 'no blogs :('}
        </div>
      )}
    </>
  )
}

export default User
