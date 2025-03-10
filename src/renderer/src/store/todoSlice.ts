import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface TodoState {
  todos: Todos
  isCreating: boolean
  newTodosValue: string
  isEditing: string
}

const initialState: TodoState = {
  todos: {
    uncompleted: [],
    completed: []
  },
  isCreating: false,
  newTodosValue: '',
  isEditing: ''
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todos>) => {
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.uncompleted.push({ todo: action.payload, _id: uuidv4() })
    },
    editTodo: (state, action: PayloadAction<{ id: string; newTodo: string }>) => {
      const { id, newTodo } = action.payload

      const updateTodo = (todo: Todo): void => {
        if (todo._id === id) {
          todo.todo = newTodo
        }
      }
      state.todos.uncompleted.forEach(updateTodo)
      state.todos.completed.forEach(updateTodo)
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload
    },
    setIsEditing: (state, action: PayloadAction<string>) => {
      state.isEditing = action.payload
    },
    setNewTodosValue: (state, action: PayloadAction<string>) => {
      state.newTodosValue = action.payload
    },
    setCompleted: (state, action: PayloadAction<string>) => {
      const todoId = action.payload
      const todoIndex = state.todos.uncompleted.findIndex((e) => e._id === todoId)
      if (todoIndex !== -1) {
        const [todo] = state.todos.uncompleted.splice(todoIndex, 1)
        state.todos.completed.push(todo)
      }
    },
    setUncompleted: (state, action: PayloadAction<string>) => {
      const todoId = action.payload

      const todoIndex = state.todos.completed.findIndex((e) => e._id === todoId)
      if (todoIndex !== -1) {
        const [todo] = state.todos.completed.splice(todoIndex, 1)
        state.todos.uncompleted.push(todo)
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload
      state.todos.uncompleted = state.todos.uncompleted.filter((t) => t._id !== todoId)
      state.todos.completed = state.todos.completed.filter((t) => t._id !== todoId)
    }
  }
})

export const {
  addTodo,
  editTodo,
  setIsCreating,
  setIsEditing,
  setNewTodosValue,
  setCompleted,
  setUncompleted,
  setTodos,
  deleteTodo
} = todoSlice.actions

export default todoSlice.reducer
