import mongoose, { Schema, Model } from 'mongoose'

const todoSchema: Schema<Todo> = new Schema(
  {
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
