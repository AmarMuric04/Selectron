import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = process.env.MONGODB_URI || ''
async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(connection)

    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

export { connectToDatabase }
