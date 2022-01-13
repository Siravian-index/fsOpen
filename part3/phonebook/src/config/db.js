import mongoose from 'mongoose'

const connectDb = async (array) => {
  const [password] = array
  try {
    await mongoose.connect(`mongodb+srv://fsOpen:${password}@oauth.d8qbt.mongodb.net/testC?retryWrites=true&w=majority`)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

export default connectDb
