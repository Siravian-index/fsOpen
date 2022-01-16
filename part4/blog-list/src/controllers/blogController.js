const { Blog } = require('../models/blogSchema')

const blogs = async (req, res) => {
  const allBlogs = await Blog.find({})
  res.json(allBlogs)
}

const newBlog = async (req, res) => {
  const blog = new Blog(request.body)
  await blog.save()
  res.status(201).json(blog)
}
