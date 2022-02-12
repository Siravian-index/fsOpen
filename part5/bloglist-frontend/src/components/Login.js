// third parties
import Notification from './Notification'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// local imports
import { showNotification } from '../reducers/notificationSlice'
import { logUser } from '../reducers/userSlice'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: 'davinchi', password: 'testing123' })
  const dispatch = useDispatch()
  const handleLogin = async (e, credentials) => {
    e.preventDefault()
    try {
      dispatch(logUser(credentials))
    } catch (err) {
      dispatch(showNotification({ message: 'wrong username or password', error: true }))
      console.log('user not found')
    }
  }
  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={(e) => handleLogin(e, credentials)}>
        <div>
          <label>
            username:
            <input
              type='text'
              id='username'
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type='password'
              id='password'
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </label>
        </div>
        <button id='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
