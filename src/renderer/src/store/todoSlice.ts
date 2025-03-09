import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface TodoState {
  todos: Todos
  isCreating: boolean
  newTodosValue: string
}

const initialState: TodoState = {
  todos: {
    uncompleted: [],
    completed: []
  },
  isCreating: false,
  newTodosValue: ''
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<any>) => {
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.uncompleted.push({ todo: action.payload, _id: uuidv4() })
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload
    },
    setNewTodosValue: (state, action: PayloadAction<string>) => {
      state.newTodosValue = action.payload
    },
    setCompleted: (state, action: PayloadAction<string>) => {
      state.todos.completed.push(action.payload)
      state.todos.uncompleted = state.todos.uncompleted.filter((e) => e._id !== action.payload._id)
    },
    setUncompleted: (state, action: PayloadAction<string>) => {
      state.todos.uncompleted.push(action.payload)
      state.todos.completed = state.todos.completed.filter((e) => e._id !== action.payload._id)
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload

      if (state.todos.uncompleted.some((t) => t._id.toString() === todoId)) {
        state.todos.uncompleted = state.todos.uncompleted.filter((t) => t._id.toString() !== todoId)
      } else if (state.todos.completed.some((t) => t._id.toString() === todoId)) {
        state.todos.completed = state.todos.completed.filter((t) => t._id.toString() !== todoId)
      }
    }
  }
})

export const {
  addTodo,
  setIsCreating,
  setNewTodosValue,
  setCompleted,
  setUncompleted,
  setTodos,
  deleteTodo
} = todoSlice.actions

export default todoSlice.reducer
