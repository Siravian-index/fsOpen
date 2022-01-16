const mongoose = require('mongoose')
const logger = require('../log/logger')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (err) {
    logger.info('error connection to MongoDB', err.message)
  }
}

module.exports = { connectDb }
