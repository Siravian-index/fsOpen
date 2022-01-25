const UserDetails = ({ user, logout }) => {
  return (
    <>
      <div>
        <span>{user.name} logged in</span> <button onClick={(e) => logout(e)}>logout</button>
      </div>
    </>
  )
}

export default UserDetails
