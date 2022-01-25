import '../index.css'
const Notification = ({ config }) => {
  const { type, blog } = config
  const blogSuccess = (blog) => {
    return (
      <h4 className='success'>
        a new blog {blog.title} by {blog.author} added
      </h4>
    )
  }
  const blogError = () => {
    return <h4 className='error'>there has been an error</h4>
  }
  const loginError = () => {
    return <h4 className='error'>wrong username or password</h4>
  }
  return (
    <>
      {type === 'loginError' && loginError()}
      {type === 'blogSuccess' && blog && blogSuccess(blog)}
      {type === 'blogError' && blogError()}
    </>
  )
}

export default Notification
