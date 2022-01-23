const logger = require('../../log/logger')
const CustomError = require('./CustomError')

module.exports.errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    const errorDisplay = error.display()
    return res.status(errorDisplay.code).send(errorDisplay)
  } else if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }
  logger.error(error.message)
  // res.status(500).send({ error: 'Something went wrong', code: 500 })
  next(error)
}

module.exports.unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
