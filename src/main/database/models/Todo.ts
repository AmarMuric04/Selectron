import mongoose, { Schema, Model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const todoSchema: Schema<Todo> = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    todo: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

const Todo: Model<Todo> = mongoose.model<Todo>('Todo', todoSchema)
export default Todo
