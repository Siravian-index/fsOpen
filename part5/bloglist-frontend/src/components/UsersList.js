import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsersState } from '../reducers/usersSlice'
// local
import { fetchUsers } from '../reducers/usersSlice'
const UsersInformation = () => {
  const dispatch = useDispatch()
  const { users, status: usersStatus, error } = useSelector(selectUsersState)
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [users, dispatch])

  if (error) {
    return <p>{error}</p>
  }

  const usersList = users.map((user) => (
    <div key={user.id}>
      <p>
        {user.username} - {user.blogs.length}
      </p>
    </div>
  ))

  return (
    <>
      <h2>Users</h2>
      <h4>blogs created</h4>
      {usersList}
    </>
  )
}

export default UsersInformation
