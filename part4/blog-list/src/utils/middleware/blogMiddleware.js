module.exports.parseTokenFromHeader = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const jwt = authorization.substring(7)
    // req.body.token = jwt
    req.token = jwt
  }
  next()
}
