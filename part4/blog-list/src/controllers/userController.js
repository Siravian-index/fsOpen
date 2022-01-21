const { User } = require('../models/userSchema')
const logger = require('../utils/log/logger.js')
const bcrypt = require('bcrypt')

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

// module.exports.getUser = (req, res) => {
// const {id} = req.params

//   //
// }

module.exports.postUser = async (req, res) => {
  const { username, name, password } = req.body
  if (!username || !name || !password) {
    return res.status(400).end()
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  // const defaultBlogs = blogs.length > 0 ? blogs : []
  const newUser = new User({ username, name, passwordHash, blogs: [] })
  const savedUser = await newUser.save()
  return res.status(201).json(savedUser)
}

// module.exports.deleteUser = (req, res) => {
//   //
// }

// module.exports.putUser = (req, res) => {
//   //
// }
