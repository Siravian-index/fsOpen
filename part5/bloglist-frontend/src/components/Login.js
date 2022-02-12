// third parties
import Notification from './Notification'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// local imports
import * as loginService from '../services/login'
import * as localStorageUtility from '../utils/localStorageUtility'
import { showNotification } from '../reducers/notificationSlice'

const Login = ({ notification, setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const handleLogin = async (e, credentials) => {
    e.preventDefault()
    const userData = await loginService.login(credentials)
    if (userData) {
      setUser(userData)
      localStorageUtility.saveToLocalStorage('currentUser', userData)
    } else {
      dispatch(showNotification({ message: 'wrong username or password', error: true }))
      console.log('user not found')
    }
  }
  return (
    <div>
      <h2>log in to application</h2>
      <Notification config={notification} />
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
