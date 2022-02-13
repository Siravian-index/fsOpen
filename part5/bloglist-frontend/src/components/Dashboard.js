import React from 'react'
import { Outlet } from 'react-router-dom'
// local
import Notification from './Notification'
import UserDetails from './UserDetails'

const Dashboard = () => {
  // get user here
  // if user is log in render outlet else redirect to login ocmponent
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <UserDetails />
      <Outlet />
    </>
  )
}

export default Dashboard
