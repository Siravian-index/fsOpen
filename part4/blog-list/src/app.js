const express = require('express')
require('express-async-errors')
const { errorHandler, unknownEndpoint } = require('./utils/middleware/error/errorMiddlewares')
const app = express()
const cors = require('cors')
require('dotenv').config()
const config = require('./utils/config/mongDB')
const { blogRouter } = require('./routes/blogRoutes')

config.connectDb()

app.use(cors())
app.use(express.json())
// routes
app.use('/api/blogs', blogRouter)

// errors
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
