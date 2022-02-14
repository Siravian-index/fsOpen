import React from 'react'
import { Link } from 'react-router-dom'
const BlogItem = ({ blog }) => {
  return (
    <>
      <p>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </p>
    </>
  )
}

export default BlogItem
