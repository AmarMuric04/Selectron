import axios from 'axios'
import { IpcMainInvokeEvent } from 'electron'
import { getAuthCredentials } from './userHandler'

const port = process.env.SERVER_PORT || 'http://localhost:5000'

export const addTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<Todo | ApiError> => {
  try {
    const { token } = await getAuthCredentials()

    const response = await axios.post(
      `${port}/todo/add-todo`,
      { todo },
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    console.log(response.data)

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export const getTodosHandler = async (): Promise<Todo[] | ApiError> => {
  try {
    const { token } = await getAuthCredentials()
    const response = await axios.get(`${port}/todo/get-todos`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    console.log(response.data)

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export const completeTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<void | ApiError> => {
  try {
    const { token } = await getAuthCredentials()
    const response = await axios.post(
      `${port}/todo/complete-todo`,
      { todo },
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    console.log(response.data)

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export const uncompleteTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<void | ApiError> => {
  try {
    const { token } = await getAuthCredentials()
    const response = await axios.post(
      `${port}/todo/uncomplete-todo`,
      { todo },
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    console.log(response.data)

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export const deleteTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<void | ApiError> => {
  try {
    const { token } = await getAuthCredentials()

    const response = await axios.delete(`${port}/todo/delete-todo/${todo}`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    console.log(response.data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export const editTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string,
  newTodo: string
): Promise<void | ApiError> => {
  try {
    const { token } = await getAuthCredentials()

    const response = await axios.put(
      `${port}/todo/edit-todo/${todo}`,
      { newTodo },
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    console.log(response.data)

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}
