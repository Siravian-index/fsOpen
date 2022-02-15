import React from 'react'
import { Outlet } from 'react-router-dom'
// local
// import BlogList from './BlogList'
// import CreateBlog from './CreateBlog'
import Notification from './Notification'
import UserDetails from './UserDetails'

const Dashboard = () => {
  // get user here
  // if user is log in render outlet else redirect to login ocmponent
  return (
    <div className='h-screen'>
      <UserDetails />
      <h2 className='text-5xl text-[#E5E9F0] text-center my-3'>blog app</h2>
      <Notification />
      <Outlet />
    </div>
  )
}

export default Dashboard
