const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const config = require('./utils/config/mongDB')

config.connectDb()

app.use(cors())
app.use(express.json())

module.exports = { app }
