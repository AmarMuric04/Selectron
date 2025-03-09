import axios from 'axios'
import { IpcMainInvokeEvent } from 'electron'
import { getAuthCredentials } from './userHandler'

const port = process.env.SERVER_PORT || 'http://localhost:5000'

export const addTodoHandler = async (_event: IpcMainInvokeEvent, todo: string): Promise<Todo> => {
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
  } catch (error: any) {
    return error.response.data
  }
}

export const getTodosHandler = async (): Promise<Todo[]> => {
  try {
    const { token } = await getAuthCredentials()
    const response = await axios.get(`${port}/todo/get-todos`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    console.log(response.data)

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const completeTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<void> => {
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
  } catch (error: any) {
    return error.response.data
  }
}

export const uncompleteTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<void> => {
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
  } catch (error: any) {
    return error.response.data
  }
}

export const deleteTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string
): Promise<void> => {
  try {
    const { token } = await getAuthCredentials()

    const response = await axios.delete(`${port}/todo/delete-todo/${todo}`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    console.log(response.data)
  } catch (error: any) {
    return error.response.data
  }
}

export const editTodoHandler = async (
  _event: IpcMainInvokeEvent,
  todo: string,
  newTodo: string
): Promise<void> => {
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
  } catch (error: any) {
    console.log(error.response.data)
    return error.response.data
  }
}
