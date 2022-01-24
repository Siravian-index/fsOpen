const { User } = require('../../models/userSchema')

module.exports.parseTokenFromHeader = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const jwt = authorization.substring(7)
    req.token = jwt
  }
  next()
}

module.exports.userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (user) {
    req.user = user
  }
  next()
}
