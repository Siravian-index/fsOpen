import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// local imports
import { clearUserFromStateAndStorage, selectUserObj } from '../reducers/userSlice'

const UserDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserObj)
  const handleClick = () => {
    dispatch(clearUserFromStateAndStorage())
  }
  return (
    <>
      <div>
        <p>
          {user.username} logged in{' '}
          <button id='logout-button' onClick={() => handleClick()}>
            logout
          </button>
        </p>
      </div>
    </>
  )
}

export default UserDetails
