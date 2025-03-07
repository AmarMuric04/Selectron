import mongoose, { Schema, Model } from 'mongoose'

const todoSchema: Schema<Todo> = new Schema({
  uncompleted: [{ type: String }],
  completed: [{ type: String }]
})

const Todo: Model<Todo> = mongoose.model<Todo>('Todo', todoSchema)
export default Todo
