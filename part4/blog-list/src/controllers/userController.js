const { User } = require('../models/userSchema')
const bcrypt = require('bcrypt')

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 })
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

module.exports.postUser = async (req, res, next) => {
  const { username, name, password } = req.body
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
