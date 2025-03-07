import express from 'express'
import cors from 'cors'
import { connectToDatabase } from '../database/connection'
import dotenv from 'dotenv'
import UserRouter from './routes/user'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', UserRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  connectToDatabase()
})
