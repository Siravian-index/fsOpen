import React from 'react'
import { Link } from 'react-router-dom'
const BlogItem = ({ blog }) => {
  return (
    <>
      <div className='rounded border p-1 text-[#E5E9F0] hover:text-[#5E81AC] hover:border-[#5E81AC]'>
        <Link to={`/blogs/${blog.id}`}>
          <span className='underline text-xl'>{blog.title}</span> <span>{blog.author}</span>
        </Link>
      </div>
    </>
  )
}

export default BlogItem
