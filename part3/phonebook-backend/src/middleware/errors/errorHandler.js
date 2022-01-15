import { customError } from './customError.js'
export const errorHandler = (error, req, res) => {
  console.error(error.message)
  if (error instanceof customError) {
    const errorRender = error.render()
    return res.status(errorRender.code).send(errorRender)
  } else if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  // very important to call next to continue with the program
  res.status(500).send({ error: 'Something went wrong', code: 500 })
  // next(error)
}
