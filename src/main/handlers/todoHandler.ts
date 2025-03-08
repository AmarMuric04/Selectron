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
  } catch (error) {
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
