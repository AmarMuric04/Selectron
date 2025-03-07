import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TodoState {
  todos: Todos
  isCreating: boolean
  newTodosValue: string
}

const initialState: TodoState = {
  todos: {
    uncompleted: [],
    completed: [],
    creator: ''
  },
  isCreating: false,
  newTodosValue: ''
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.uncompleted.push(action.payload)
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload
    },
    setNewTodosValue: (state, action: PayloadAction<string>) => {
      state.newTodosValue = action.payload
    },
    setCompleted: (state, action: PayloadAction<string>) => {
      state.todos.completed.push(action.payload)
      state.todos.uncompleted = state.todos.uncompleted.filter((e) => e !== action.payload)
    },
    setUncompleted: (state, action: PayloadAction<string>) => {
      state.todos.uncompleted.push(action.payload)
      state.todos.completed = state.todos.completed.filter((e) => e !== action.payload)
    }
  }
})

export const { addTodo, setIsCreating, setNewTodosValue, setCompleted, setUncompleted } =
  todoSlice.actions

export default todoSlice.reducer
