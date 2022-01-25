const UserDetails = ({ user, logout }) => {
  return (
    <>
      <div>
        <span>{user.name} logged in</span> <button onClick={() => logout()}>logout</button>
      </div>
    </>
  )
}

export default UserDetails
