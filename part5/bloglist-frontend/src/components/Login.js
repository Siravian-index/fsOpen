import Notification from './Notification'
import React, { useState } from 'react'
import * as loginService from '../services/login'
import * as localStorageUtility from '../utils/localStorageUtility'

const Login = ({ notification, setUser, setNotificationConfig }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = async (e, credentials) => {
    e.preventDefault()
    const userData = await loginService.login(credentials)
    if (userData) {
      setUser(userData)
      localStorageUtility.saveToLocalStorage('currentUser', userData)
      setCredentials({ username: '', password: '' })
    } else {
      setNotificationConfig({ type: 'loginError' })
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
