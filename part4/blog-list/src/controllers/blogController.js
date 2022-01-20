const { Blog } = require('../models/blogSchema.js')
const logger = require('../utils/log/logger.js')

module.exports.allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    return res.json(blogs)
  } catch (err) {
    logger.info(err)
    next(err)
  }
}
module.exports.newBlog = async (req, res, next) => {
  const { title, author, url, likes } = req.body
  if (!title || !author || !url) {
    return res.status(400).end()
  }
  try {
    let defaultLikes = likes > 0 ? likes : 0
    const blog = new Blog({ title, author, url, likes: defaultLikes })
    await blog.save()
    return res.status(201).json(blog)
  } catch (err) {
    logger.info(err)
    next(err)
  }
}
module.exports.oneBlog = async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).end()
  }
  try {
    const blog = await Blog.findById(id)
    if (blog) {
      return res.status(200).json(blog)
    }
    return res.status(404).end()
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

// here we are using express-async-errors library which
// let us eliminate try/catch and still work on exceptions
module.exports.deleteBlog = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).end()
  }
  // I am not a big fan of removing try/catch, but it is just to try the library
  await Blog.findByIdAndDelete(id)
  return res.status(204).end()
}

// I did not use try/catch here either. I must admit it looks like more stylish,
// but I honestly miss the try/catch
module.exports.updateBlog = async (req, res) => {
  const { id } = req.params
  const { likes, title, author, url } = req.body
  if (!id) {
    return res.status(400).end()
  }
  const prevBlog = await Blog.findById(id)
  const blogToUpdate = {
    author: author ?? prevBlog.author,
    title: title ?? prevBlog.title,
    url: url ?? prevBlog.url,
    likes: likes > 0 ? likes : prevBlog.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true })
  return res.status(200).json(updatedBlog)
}
