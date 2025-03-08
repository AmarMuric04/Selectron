import mongoose, { Schema, Model } from 'mongoose'

const userSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: {
      uncompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
      completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
    }
  },
  { timestamps: true }
)

const User: Model<User> = mongoose.model<User>('User', userSchema)
export default User
