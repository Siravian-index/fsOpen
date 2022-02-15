const { Blog } = require('../models/blogSchema.js')
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
  if (!title || !author || !url) {
    return res.status(400).end()
  }
  try {
    const user = req.user
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
  const { id } = req.params
  if (!id) {
    return res.status(400).end()
  }
  const user = req.user
  const blogToDelete = await Blog.findById(id)
  if (user._id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndDelete(id)
    // delete the blog id from user.blog array
    user.blogs = user.blogs.filter((blogId) => blogId.toString() !== blogToDelete._id.toString())
    await user.save()
    return res.status(204).end()
  }
  throw new CustomError('your are not the owner of this blog', 401)
}

// I did not use try/catch here either. I must admit it looks like more stylish,
// but I honestly miss the try/catch
module.exports.updateBlog = async (req, res) => {
  const { body } = req
  const { id } = req.params
  const blog = {
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  if (updatedBlog) {
    return res.status(200).json(updatedBlog.toJSON())
  } else {
    return res.status(404).end()
  }
}

module.exports.newComment = async (req, res) => {
  const { comment } = req.body
  const { id } = req.params
  if (!comment || !id) {
    return res.status(400).end()
  }
  try {
    const user = req.user
    console.log(user)
    const blog = await Blog.findById(id)
    blog.comments.push(comment)
    await blog.save()
    return res.status(201).json(blog)
  } catch (err) {
    next(err)
  }
}
