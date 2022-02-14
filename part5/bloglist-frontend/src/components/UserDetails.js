import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// local imports
import { clearUserFromStateAndStorage, selectUserObj } from '../reducers/userSlice'

const UserDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUserObj)
  const handleClick = () => {
    dispatch(clearUserFromStateAndStorage())
    navigate('/login')
  }
  return (
    <>
      <nav>
        <div>
          <Link to='/blogs'>blogs</Link>
        </div>
        <div>
          <Link to='/users'>users</Link>
        </div>
        <div>
          {user.username} logged in{' '}
          <button id='logout-button' onClick={() => handleClick()}>
            logout
          </button>
        </div>
      </nav>
    </>
  )
}

export default UserDetails
