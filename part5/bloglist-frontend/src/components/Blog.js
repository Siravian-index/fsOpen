import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsSlice'

// local imports
import * as blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [showExtraInfo, setShowExtraInfo] = useState(false)
  const [postedBy, setPostedBy] = useState('')
  const [username, setUsername] = useState('')

  const handleShow = () => {
    setShowExtraInfo(!showExtraInfo)
  }
  const handleLike = async (blog) => {
    setPostedBy(postedBy || blog.user?.name)
    setUsername(username || blog.user?.username)
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    const c = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (c) {
      const res = await blogService.deleteBlog(blog.id, user.token)
      console.log(res)
      if (res) {
        // set success banner
        // setBlogs((prev) => prev.filter((b) => b.id !== blog.id))
      }
      // set error banner
    }
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
      <div style={blogStyle} className='blog'>
        <span className='title-author'>
          {blog.title} {blog.author}{' '}
          <button id='show-more' onClick={handleShow}>
            {showExtraInfo ? 'hide' : 'view'}
          </button>
        </span>
        {showExtraInfo && (
          <div className='extra-content'>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}{' '}
              <button id='like-button' onClick={() => handleLike(blog)}>
                like
              </button>
            </div>
            <div>{blog.user?.name || postedBy}</div>
            <div>
              {(user.username === blog.user?.username || username === user.username) && (
                <button id='delete-button' onClick={() => handleDelete(blog)}>
                  delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
