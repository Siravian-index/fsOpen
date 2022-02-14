import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
// local imports
import { useLoadResource } from '../hooks/useLoadResource'
import { useShowOutlet } from '../hooks/useShowOutlet'
import { fetchBlogs, selectBlogsState } from '../reducers/blogsSlice'
import BlogItem from './BlogItem'

const BlogList = () => {
  const { id } = useParams()
  const { blogs, status: blogStatus, error } = useSelector(selectBlogsState)
  useLoadResource(blogs, blogStatus, fetchBlogs)
  const { resourceId, setShowOutlet, showOutlet } = useShowOutlet(id)

  let content
  if (blogStatus === 'loading') {
    content = <div>loading...</div>
  } else if (blogStatus === 'succeeded') {
    const orderedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    content = orderedBlogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
  } else if (blogStatus === 'failed') {
    content = <div>{error}</div>
  }
  return <>{!showOutlet ? <section>{content}</section> : <Outlet context={[resourceId, setShowOutlet]} />}</>
}

export default BlogList
