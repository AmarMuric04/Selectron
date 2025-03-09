import mongoose, { Schema, Model } from 'mongoose'

const userSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: {
      uncompleted: [{ type: String, ref: 'Todo' }],
      completed: [{ type: String, ref: 'Todo' }]
    }
  },
  { timestamps: true }
)

const User: Model<User> = mongoose.model<User>('User', userSchema)
export default User
