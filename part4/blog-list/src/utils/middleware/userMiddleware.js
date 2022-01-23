const CustomError = require('./error/CustomError')
const { User } = require('../../models/userSchema')

const minLength = (min, ...arr) => {
  let flag = false
  for (let item of arr) {
    if (item.length < min) {
      flag = true
      break
    }
  }
  return flag
}

module.exports.verifyNewUserData = async (req, res, next) => {
  const { name, username, password } = req.body
  if (!name || !username || !password) {
    throw new CustomError('name, username, and password are required fields')
  }
  if (minLength(3, name, username, password)) {
    throw new CustomError('username and password must be longer than three characters')
  }
  const isRegistered = await User.exists({ username })
  if (isRegistered) {
    throw new CustomError('username already registered')
  }
  next()
}
