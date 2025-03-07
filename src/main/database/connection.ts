import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectToDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI || 'a random mongodb uri'
    console.log('Connecting to MongoDB')
    await mongoose.connect(uri)
    console.log('Connected to MongoDB with Mongoose')
  } catch (error) {
    console.error('Mongoose connection error:', error)
  }
}

export default mongoose
