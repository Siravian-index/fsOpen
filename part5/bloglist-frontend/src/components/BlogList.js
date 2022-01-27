import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user }) => {
  // sort by the number of likes
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
        ))}
    </>
  )
}

export default BlogList
