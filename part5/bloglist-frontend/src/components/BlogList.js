import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
// local imports
import { fetchBlogs, selectBlogsState } from '../reducers/blogsSlice'
import BlogItem from './BlogItem'

const BlogList = () => {
  const dispatch = useDispatch()
  const [showOutlet, setShowOutlet] = useState(false)
  const [blogId, setBlogId] = useState(null)
  const { id } = useParams()
  const { blogs, status: blogStatus, error } = useSelector(selectBlogsState)
  // loads blogs
  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [blogs, dispatch])

  // shows Outlet depending on whether there is an id or not
  useEffect(() => {
    if (id) {
      setShowOutlet(true)
      setBlogId(id)
    } else {
      setShowOutlet(false)
    }
  }, [id])

  // gets the correct value for content
  let content
  if (blogStatus === 'loading') {
    content = <div>loading...</div>
  } else if (blogStatus === 'succeeded') {
    const orderedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    content = orderedBlogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
  } else if (blogStatus === 'failed') {
    content = <div>{error}</div>
  }
  // render outlet conditionally
  return <>{!showOutlet ? <section>{content}</section> : <Outlet context={[blogId, setShowOutlet]} />}</>
}

export default BlogList
