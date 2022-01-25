import Notification from './Notification'

const Login = ({ login, notification }) => {
  const { credentials, setCredentials, handleLogin } = login
  return (
    <div>
      <h2>log in to application</h2>
      <Notification config={notification} />
      <form onSubmit={(e) => handleLogin(e, credentials)}>
        <div>
          <label>
            username:
            <input
              type='text'
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type='password'
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
