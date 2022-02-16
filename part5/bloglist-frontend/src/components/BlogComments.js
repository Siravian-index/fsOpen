import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment } from '../reducers/blogsSlice'
import { selectUserToken } from '../reducers/userSlice'

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()
  const token = useSelector(selectUserToken)
  const { comments, id } = blog
  const [comment, setComment] = useState('')

  const canSave = Boolean(comment)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { comment, id, token }
    dispatch(addNewComment(payload))
    setComment('')
  }

  const commentsList = comments
    .slice()
    .reverse()
    .map((c, i) => (
      <ul key={i}>
        <li>{c}</li>
      </ul>
    ))
  return (
    <>
      <div>
        <h3 className='text-2xl text-center'>comments:</h3>
      </div>
      <form className='flex flex-col items-center' onSubmit={(e) => handleSubmit(e)}>
        <input
          className='rounded py-1 px-1 outline outline-[#3B4252] text-black'
          placeholder='comment'
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className={`${canSave ? 'bg-[#A3BE8C]' : 'bg-slate-400'} rounded py-1 px-2 text-[#D8DEE9]`}
          disabled={!canSave}
        >
          add comment
        </button>
      </form>
      {commentsList}
    </>
  )
}

export default BlogComments
