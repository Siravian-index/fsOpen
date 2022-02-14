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
      <p>
        <Link to={`/users/${user.id}`}>{user.username}</Link>- {user.blogs.length}
      </p>
    </div>
  ))

  return (
    <>
      {!showOutlet ? (
        <>
          <h2>Users</h2>
          <h4>blogs created</h4>
          {usersList}
        </>
      ) : (
        <Outlet context={[resourceId, setShowOutlet]} />
      )}
    </>
  )
}

export default UsersInformation
