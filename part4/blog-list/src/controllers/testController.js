const { Blog } = require('../models/blogSchema')
const { User } = require('../models/userSchema')
// const CustomError = require('../utils/middleware/error/CustomError.js')

module.exports.clearDb = async (req, res, next) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
}
