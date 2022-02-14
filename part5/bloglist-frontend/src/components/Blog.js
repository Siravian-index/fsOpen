import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
// local imports
import { deleteBlog, likeBlog, selectBlogFromArray } from '../reducers/blogsSlice'
import { selectUserObj } from '../reducers/userSlice'

const Blog = () => {
  const user = useSelector(selectUserObj)
  const dispatch = useDispatch()
  // user.name / user.username << tests with own post
  const [postedBy, setPostedBy] = useState('')
  const [username, setUsername] = useState('')

  // useEffect to identify the owner || select it from the store
  const navigate = useNavigate()
  const [blogId, setShowOutlet] = useOutletContext()
  const blog = useSelector((state) => selectBlogFromArray(state, blogId))
  // returns the user to the /users page if no specific user was found
  useEffect(() => {
    if (!blog) {
      navigate('/blogs/')
      setShowOutlet(false)
    }
  }, [blog])

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
      {blog && (
        <>
          <div style={blogStyle} className='blog'>
            <h3 className='title-author'>
              {blog.title} {blog.author}
            </h3>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}{' '}
              <button id='like-button' onClick={() => handleLike(blog)}>
                like
              </button>
            </div>
            {/* deletesd */}
            <div>added by {blog.user?.name || postedBy}</div>
            <div>
              {(user.username === blog.user?.username || username === user.username) && (
                <button id='delete-button' onClick={() => handleDelete(blog)}>
                  delete
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Blog
