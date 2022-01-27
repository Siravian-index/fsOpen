import React, { useState } from 'react'
import * as blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [showExtraInfo, setShowExtraInfo] = useState(false)
  const handleShow = () => {
    setShowExtraInfo(!showExtraInfo)
  }
  const handleLike = async (blog) => {
    const baseUpdate = {
      user: blog.user.id,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const updatedBlog = await blogService.editBlog(baseUpdate, blog.id, user.token)
    await setBlogs((prev) => prev.map((b) => (b.id !== blog.id ? b : updatedBlog)))
  }

  const handleDelete = async (blog) => {
    //
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <>
      <div style={blogStyle}>
        <span>
          {blog.title} {blog.author} <button onClick={handleShow}>{showExtraInfo ? 'hide' : 'view'}</button>
        </span>
        {showExtraInfo && (
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
            </div>
            <div>{blog.user.username}</div>
            <div>
              <button onClick={() => handleDelete(blog)}>delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
