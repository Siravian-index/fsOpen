// third parties
import Notification from './Notification'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// local imports
import { showNotification } from '../reducers/notificationSlice'
import { logUser } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e, credentials) => {
    e.preventDefault()
    try {
      const res = await dispatch(logUser(credentials)).unwrap()
      if (!res) {
        throw new Error('invalid User')
      }
      navigate('/blogs')
    } catch (err) {
      dispatch(showNotification({ message: 'wrong username or password', error: true }))
      console.log('user not found')
    }
  }
  return (
    <div className='h-screen flex flex-col justify-center'>
      <div className='flex flex-col items-center justify-center bg-[#E5E9F0] gap-1 '>
        <h2 className='text-xl mt-4'>log in to application</h2>
        <Notification />
        <form
          onSubmit={(e) => handleLogin(e, credentials)}
          className='flex flex-col justify-center items-center gap-1 mb-2'
        >
          <div className=''>
            <label>
              username:
              <input
                className='border p-1 rounded'
                type='text'
                id='username'
                placeholder='username'
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
                className='border p-1 rounded'
                type='password'
                id='password'
                placeholder='password'
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </label>
          </div>
          <button
            id='login-button'
            type='submit'
            className='border py-1 px-3 bg-[#8FBCBB] rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
