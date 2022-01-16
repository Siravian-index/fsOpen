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
    // change the way Blogs are created
    const blog = new Blog(req.body)
    await blog.save()
    res.status(201).json(blog)
  } catch (err) {
    logger.info(err)
    next(err)
  }
}
