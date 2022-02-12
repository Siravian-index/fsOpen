import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// local imports
import { deleteBlog, likeBlog } from '../reducers/blogsSlice'

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
      const payload = { blog, token: user.token }
      dispatch(deleteBlog(payload))
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
