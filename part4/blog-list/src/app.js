const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const config = require('./utils/config/mongDB')
const { blogRouter } = require('./routes/blogRoutes')

config.connectDb()

app.use(cors())
app.use(express.json())
// routes
app.use('/api/blogs', blogRouter)

module.exports = { app }
