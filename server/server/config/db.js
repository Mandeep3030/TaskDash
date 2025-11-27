import mongoose from 'mongoose'
import config from './config.js'

mongoose.Promise = global.Promise

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Succcessful: Connected to MongoDB:', config.mongoUri)
  } catch (err) {
    console.error('Unsuccessful: Error connecting to MongoDB:', err)
    process.exit(1)
  }
}

export default connectDB