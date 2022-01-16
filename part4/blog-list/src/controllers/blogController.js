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
  try {
    const blog = new Blog(request.body)
    await blog.save()
    res.status(201).json(blog)
  } catch (err) {
    logger.info(err)
    next(err)
  }
}
