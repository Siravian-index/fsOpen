import * as loginService from '../services/login'

const UserDetails = ({ user, setUser }) => {
  return (
    <>
      <div>
        <span>{user.name} logged in</span> <button onClick={() => loginService.logout(setUser)}>logout</button>
      </div>
    </>
  )
}

export default UserDetails
