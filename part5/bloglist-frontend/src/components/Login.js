const Login = ({ login }) => {
  const { credentials, setCredentials, handleLogin } = login
  return (
    <div>
      <h3>log in to application</h3>
      <form onSubmit={(e) => handleLogin(e, credentials)}>
        <input
          type='text'
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type='password'
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
