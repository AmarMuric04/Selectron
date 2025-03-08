import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: {
    username: string
    _id: string
  }
}

const initialState: UserState = {
  user: {
    username: '',
    _id: ''
  }
}

const todoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; _id: string }>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = todoSlice.actions

export default todoSlice.reducer
