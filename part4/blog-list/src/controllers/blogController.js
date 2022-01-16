const { Blog } = require('../models/blogSchema')

module.exports.allBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
}

module.exports.newBlog = async (req, res) => {
  const blog = new Blog(request.body)
  await blog.save()
  res.status(201).json(blog)
}
