import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log('error connection to MongoDB', err.message)
  }
}

export default connectDb
