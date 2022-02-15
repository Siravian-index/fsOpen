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

  const commentsList = comments.map((c, i) => (
    <ul key={i}>
      <li>{c}</li>
    </ul>
  ))
  return (
    <>
      <h3>comments</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button disabled={!canSave}>add comment</button>
      </form>
      {commentsList}
    </>
  )
}

export default BlogComments
