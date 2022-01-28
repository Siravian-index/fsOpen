import React, { useState } from 'react'
import * as blogService from '../services/blogs'

const CreateBlog = ({ user, setBlogs, setNotificationConfig }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showBlogForm, setShowBlogForm] = useState(false)

  const handleNewBlog = async (e, newBlog) => {
    e.preventDefault()
    const blog = await blogService.createOne(newBlog, user.token)
    if (blog) {
      setBlogs((prev) => [...prev, blog])
      setNewBlog({ title: '', author: '', url: '' })
      setNotificationConfig({ type: 'blogSuccess', blog })
      // hide form
      setShowBlogForm(!showBlogForm)
    } else {
      setNotificationConfig({ type: 'blogError' })
      console.log('bad request')
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
                  value={newBlog.url}
                  onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
                  type='text'
                  required
                />
              </label>
            </div>
            <button type='submit'>create</button>
          </form>
        </div>
      )}
      <div>
        <button onClick={() => setShowBlogForm(!showBlogForm)}>{showBlogForm ? 'cancel' : 'create a new blog'}</button>
      </div>
    </>
  )
}

export default CreateBlog
