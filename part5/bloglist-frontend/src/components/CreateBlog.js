import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// local imports
import { addNewBlog } from '../reducers/blogsSlice'
import { showNotification } from '../reducers/notificationSlice'

const CreateBlog = ({ user }) => {
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = Object.values(newBlog).every(Boolean) && addRequestStatus === 'idle'
  const handleNewBlog = async (e, newBlog) => {
    e.preventDefault()
    try {
      setAddRequestStatus('pending')
      const payload = { newBlog, token: user.token }
      const blog = await dispatch(addNewBlog(payload)).unwrap()
      dispatch(showNotification({ message: `a new blog ${blog.title} by ${blog.author} added` }))
      setNewBlog({ title: '', author: '', url: '' })
      setShowBlogForm(!showBlogForm)
    } catch (err) {
      dispatch(showNotification({ message: 'something went wrong', error: true }))
      console.log('bad request')
    } finally {
      setAddRequestStatus('idle')
    }
  }
  return (
    <>
      {showBlogForm && (
        <div>
          <h2>create new</h2>
          <form onSubmit={(e) => handleNewBlog(e, newBlog)}>
            <div>
              <label>
                title:
                <input
                  placeholder='title'
                  id='title'
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  type='text'
                  required
                />
              </label>
            </div>
            <div>
              <label>
                author:
                <input
                  placeholder='author'
                  id='author'
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  type='text'
                  required
                />
              </label>
            </div>
            <div>
              <label>
                url:
                <input
                  placeholder='url'
                  id='url'
                  value={newBlog.url}
                  onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
                  type='text'
                  required
                />
              </label>
            </div>
            <button disabled={!canSave} id='submit-blog' type='submit'>
              create
            </button>
          </form>
        </div>
      )}
      <div>
        <button id='show-form-button' onClick={() => setShowBlogForm(!showBlogForm)}>
          {showBlogForm ? 'cancel' : 'create a new blog'}
        </button>
      </div>
    </>
  )
}

export default CreateBlog
