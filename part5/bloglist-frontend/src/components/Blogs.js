import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
// local
import { useShowOutlet } from '../hooks/useShowOutlet'
import BlogList from './BlogList'
import CreateBlog from './CreateBlog'

const Blogs = () => {
  const { id } = useParams()
  const { resourceId, setShowOutlet, showOutlet } = useShowOutlet(id)
  return (
    <>
      {!showOutlet ? (
        <>
          <CreateBlog />
          <BlogList />
        </>
      ) : (
        <Outlet context={[resourceId, setShowOutlet]} />
      )}
    </>
  )
}

export default Blogs
