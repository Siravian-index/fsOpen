const express = require('express')
require('express-async-errors')
const { errorHandler, unknownEndpoint } = require('./utils/middleware/error/errorMiddlewares')
const app = express()
const cors = require('cors')
require('dotenv').config()
const config = require('./utils/config/mongDB')
const { blogRouter } = require('./routes/blogRoutes')
const { userRouter } = require('./routes/userRoutes')
const { loginRouter } = require('./routes/loginRoutes')

config.connectDb()

app.use(cors())
app.use(express.json())
// routes
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// conditionally setting a route for testing only
if (process.env.NODE_ENV === 'test') {
  const { testRouter } = require('./routes/testRoutes')
  app.use('/api/testing', testRouter)
}
// errors
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
