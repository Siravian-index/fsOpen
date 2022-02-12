import Blog from './Blog'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// local imports
import { fetchBlogs, selectBlogsState } from '../reducers/blogsSlice'

// we still need to refactor setBlogs and user props since we don't have to pass them as props
const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs, status: blogStatus, error } = useSelector(selectBlogsState)
  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [blogs, dispatch])

  let content
  if (blogStatus === 'loading') {
    content = <div>loading...</div>
  } else if (blogStatus === 'succeeded') {
    const orderedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    content = orderedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
  } else if (blogStatus === 'failed') {
    content = <div>{error}</div>
  }
  return <section>{content}</section>
}

export default BlogList
