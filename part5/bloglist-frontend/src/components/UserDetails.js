import * as loginService from '../services/login'
import React from 'react'

// dispatch an action to log the user out
const UserDetails = ({ user, setUser }) => {
  return (
    <>
      <div>
        <p>
          {user.username} logged in{' '}
          <button id='logout-button' onClick={() => loginService.logout(setUser)}>
            logout
          </button>
        </p>
      </div>
    </>
  )
}

export default UserDetails
