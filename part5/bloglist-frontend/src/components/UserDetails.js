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
      <nav className='flex justify-center items-baseline gap-5 pt-4'>
        <div className='text-[#E5E9F0] underline'>
          <Link to='/blogs'>blogs</Link>
        </div>
        <div className='text-[#E5E9F0] underline'>
          <Link to='/users'>users</Link>
        </div>
        <div className='text-[#D8DEE9]'>{user.username} logged in </div>
        <button
          className='text-[#E5E9F0] py-1 px-3 bg-[#BF616A] rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300'
          id='logout-button'
          onClick={() => handleClick()}
        >
          logout
        </button>
      </nav>
    </>
  )
}

export default UserDetails
