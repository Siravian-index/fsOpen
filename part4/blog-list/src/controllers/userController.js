const { User } = require('../models/userSchema')
const logger = require('../utils/log/logger.js')
const bcrypt = require('bcrypt')

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1 })
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

// module.exports.getUser = (req, res) => {
// const {id} = req.params

//   //
// }

module.exports.postUser = async (req, res, next) => {
  const { username, name, password } = req.body
  // create a middleware for this type of validation
  if (!username || !name || !password) {
    return res.status(400).end()
  }
  // ----------------
  const saltRounds = 10
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({ username, name, passwordHash, blogs: [] })
    const savedUser = await newUser.save()
    return res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
}

// module.exports.deleteUser = (req, res) => {
//   //
// }

// module.exports.putUser = (req, res) => {
//   //
// }
