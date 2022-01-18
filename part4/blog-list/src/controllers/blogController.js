const { Blog } = require('../models/blogSchema')
const logger = require('../utils/log/logger')

module.exports.allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (err) {
    logger.info(err)
    next(err)
  }
}

module.exports.newBlog = async (req, res, next) => {
  const { title, author, url } = req.body
  if (!title || !author || !url) {
    return res.status(400).end()
  }
  try {
    const blog = new Blog({ title, author, url })
    await blog.save()
    return res.status(201).json(blog)
  } catch (err) {
    logger.info(err)
    next(err)
  }
}
