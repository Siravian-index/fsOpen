import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
// local
import { selectUsersState } from '../reducers/usersSlice'
import { fetchUsers } from '../reducers/usersSlice'

const UsersInformation = () => {
  const [showOutlet, setShowOutlet] = useState(false)
  const [userId, setUserId] = useState(null)
  const dispatch = useDispatch()
  const { id } = useParams()
  const { users, status: usersStatus, error } = useSelector(selectUsersState)
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [users, dispatch])

  useEffect(() => {
    if (id) {
      setShowOutlet(true)
      setUserId(id)
    }
  }, [id])

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
      {!showOutlet ? (
        <>
          <h2>Users</h2>
          <h4>blogs created</h4>
          {usersList}
        </>
      ) : (
        <Outlet context={[userId, setShowOutlet]} />
      )}
    </>
  )
}

export default UsersInformation
