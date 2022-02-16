import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams, Link } from 'react-router-dom'
// local
import { selectUsersState } from '../reducers/usersSlice'
import { fetchUsers } from '../reducers/usersSlice'
import { useShowOutlet } from '../hooks/useShowOutlet'
import { useLoadResource } from '../hooks/useLoadResource'

const UsersInformation = () => {
  const { id } = useParams()
  const { resourceId, setShowOutlet, showOutlet } = useShowOutlet(id)
  const { users, status, error } = useSelector(selectUsersState)
  // loads users from backend
  useLoadResource(users, status, fetchUsers)

  if (error) {
    return <p>{error}</p>
  }

  const usersList = users.map((user) => (
    <div key={user.id}>
      <p className='hover:underline'>
        <Link to={`/users/${user.id}`}>{user.username}</Link> - {user.blogs.length}
      </p>
    </div>
  ))

  return (
    <>
      {!showOutlet ? (
        <div className='flex flex-col justify-center items-center text-[#E5E9F0]'>
          <h2 className='text-2xl'>Users</h2>
          <h4>blogs created</h4>
          {usersList}
        </div>
      ) : (
        <Outlet context={[resourceId, setShowOutlet]} />
      )}
    </>
  )
}

export default UsersInformation
