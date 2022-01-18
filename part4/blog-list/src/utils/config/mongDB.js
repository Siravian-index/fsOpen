const mongoose = require('mongoose')
const logger = require('../log/logger')

const PORT = process.env.PORT
// const MONGODB_URI = process.env.MONGODB_URI
// It now checks the env before assigning a URI
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (err) {
    logger.info('error connection to MongoDB', err.message)
  }
}

module.exports = { connectDb, PORT }
