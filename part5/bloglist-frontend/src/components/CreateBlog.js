import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// local imports
import { addNewBlog } from '../reducers/blogsSlice'
import { showNotification } from '../reducers/notificationSlice'
import { selectUserToken } from '../reducers/userSlice'

const CreateBlog = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectUserToken)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = Object.values(newBlog).every(Boolean) && addRequestStatus === 'idle'
  const handleNewBlog = async (e, newBlog) => {
    e.preventDefault()
    try {
      setAddRequestStatus('pending')
      const payload = { newBlog, token }
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
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-3xl text-[#E5E9F0] my-3'>create new</h2>
          <form className='flex flex-col gap-1' onSubmit={(e) => handleNewBlog(e, newBlog)}>
            <div className='flex justify-between items-baseline'>
              <label className='text-[#E5E9F0]' htmlFor='title'>
                title:
              </label>
              <input
                className='rounded py-1 px-1 outline outline-[#3B4252]'
                placeholder='title'
                id='title'
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                type='text'
                required
              />
            </div>
            <div className='flex justify-between items-baseline'>
              <label className='text-[#E5E9F0]' htmlFor='author'>
                author:
              </label>
              <input
                className='rounded py-1 px-1 outline outline-[#3B4252]'
                placeholder='author'
                id='author'
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                type='text'
                required
              />
            </div>
            <div className='flex justify-between items-baseline'>
              <label className='text-[#E5E9F0]' htmlFor='url'>
                url:
              </label>
              <input
                className='rounded py-1 px-1 outline outline-[#3B4252]'
                placeholder='url'
                id='url'
                value={newBlog.url}
                onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
                type='text'
                required
              />
            </div>
            <button
              className={`${canSave ? 'bg-[#A3BE8C]' : 'bg-slate-400'} rounded py-1 px-2 text-[#D8DEE9]`}
              disabled={!canSave}
              id='submit-blog'
              type='submit'
            >
              create
            </button>
          </form>
        </div>
      )}
      <div className='flex justify-center'>
        <button
          className='bg-[#D08770] rounded py-1 px-2 mt-1 text-[#D8DEE9]'
          id='show-form-button'
          onClick={() => setShowBlogForm(!showBlogForm)}
        >
          {showBlogForm ? 'cancel' : 'create a new blog'}
        </button>
      </div>
    </>
  )
}

export default CreateBlog
