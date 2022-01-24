const { Blog } = require('../models/blogSchema.js')
const { User } = require('../models/userSchema.js')
const jwt = require('jsonwebtoken')
const logger = require('../utils/log/logger.js')
const CustomError = require('../utils/middleware/error/CustomError.js')

module.exports.allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return res.json(blogs)
  } catch (err) {
    next(err)
  }
}
module.exports.newBlog = async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!title || !author || !url) {
    return res.status(400).end()
  }
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  try {
    const user = await User.findById(decodedToken.id)
    let defaultLikes = likes > 0 ? likes : 0
    const blog = new Blog({ title, author, url, likes: defaultLikes, user: user._id })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return res.status(201).json(savedBlog)
  } catch (err) {
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
    next(err)
  }
}

// here we are using express-async-errors library which
// let us eliminate try/catch and still work on exceptions
module.exports.deleteBlog = async (req, res) => {
  // extract this to a middleware
  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const { id } = req.params
  if (!id) {
    return res.status(400).end()
  }
  const user = req.user
  const blogToDelete = await Blog.findById(id)
  if (user._id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndDelete(id)
    return res.status(204).end()
  }
  throw new CustomError('your are not the owner of this blog', 401)
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
