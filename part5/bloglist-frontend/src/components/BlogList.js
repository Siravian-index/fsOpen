import React from 'react'
import { useSelector } from 'react-redux'
// local imports
import { useLoadResource } from '../hooks/useLoadResource'
import { fetchBlogs, selectBlogsState } from '../reducers/blogsSlice'
import BlogItem from './BlogItem'

const BlogList = () => {
  const { blogs, status: blogStatus, error } = useSelector(selectBlogsState)
  useLoadResource(blogs, blogStatus, fetchBlogs)

  let content
  if (blogStatus === 'loading') {
    content = <div>loading...</div>
  } else if (blogStatus === 'succeeded') {
    const orderedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    content = orderedBlogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
  } else if (blogStatus === 'failed') {
    content = <div>{error}</div>
  }
  return (
    <>
      <section>{content}</section>
    </>
  )
}

export default BlogList
