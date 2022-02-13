import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
// local
import { selectUserFromArray } from '../reducers/usersSlice'
const User = () => {
  const navigate = useNavigate()
  const [userId, setShowOutlet] = useOutletContext()
  const user = useSelector((state) => selectUserFromArray(state, Number(userId)))

  // returns the user to the /users page if no specific user was found
  useEffect(() => {
    if (!user) {
      navigate('/users/')
      setShowOutlet(false)
    }
  }, [user])
  return (
    <>
      {user && (
        <div>
          <h4>username</h4>
          <h3>added blogs</h3>
          <div>list of blogs</div>
        </div>
      )}
    </>
  )
}

export default User
