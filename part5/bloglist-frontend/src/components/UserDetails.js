import * as loginService from '../services/login'
import React from 'react'

const UserDetails = ({ user, setUser }) => {
  return (
    <>
      <div>
        <p>
          {user.username} logged in <button onClick={() => loginService.logout(setUser)}>logout</button>
        </p>
      </div>
    </>
  )
}

export default UserDetails
