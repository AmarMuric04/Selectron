import { IpcMainInvokeEvent } from 'electron'
import User from '../database/models/User'
import axios from 'axios'
import dotenv from 'dotenv'
import keytar from 'keytar'
import { jwtDecode } from 'jwt-decode'
dotenv.config()
const port = process.env.SERVER_PORT || 'http://localhost:5000'

async function storeAuthCredentials(token: string, userId: string): Promise<void> {
  await keytar.setPassword('Selectron', 'token', token)
  await keytar.setPassword('Selectron', 'userId', userId)
}

export async function getAuthCredentials(): Promise<{
  token: string | null
  userId: string | null
}> {
  const token = await keytar.getPassword('Selectron', 'token')
  const userId = await keytar.getPassword('Selectron', 'userId')
  return { token, userId }
}

async function clearAuthCredentials(): Promise<void> {
  await keytar.deletePassword('Selectron', 'token')
  await keytar.deletePassword('Selectron', 'userId')
}

async function signUserIn(userId: string, token: string): Promise<AddUserType | ApiError> {
  console.log(`User ${userId} signed in successfully with token: ${token}`)

  try {
    const response = await axios.post(`${port}/user/auto-sign-in`, { userId })

    return response.data.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

function promptUserToLogIn(): void {
  console.log('No valid credentials found or token expired. Prompting user to log in.')
}

export async function autoSignIn(): Promise<User | null> {
  const { token, userId } = await getAuthCredentials()

  if (token && userId) {
    try {
      const decoded = jwtDecode(token)
      if (!decoded || !decoded?.exp) return null
      if (decoded?.exp * 1000 > Date.now()) {
        console.log(new Date(decoded?.exp * 1000))
        const user = await signUserIn(userId, token)

        return user
      } else {
        await clearAuthCredentials()
        promptUserToLogIn()
        return null
      }
    } catch (error) {
      console.log(error)
      await clearAuthCredentials()
      promptUserToLogIn()
      return null
    }
  } else {
    promptUserToLogIn()
    return null
  }
}

export async function signUpHandler(
  _event: IpcMainInvokeEvent,
  userData: User
): Promise<AddUserType | ApiError> {
  try {
    const { password, email, username } = userData

    const response = await axios.post(`${port}/user/signup`, {
      username,
      email,
      password
    })

    const data = response.data as AddUserType
    const token = data.data.token
    const userId = data.data.user._id

    await storeAuthCredentials(token, userId)

    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export async function logInHandler(
  _event: IpcMainInvokeEvent,
  userData: {
    email: string
    password: string
  }
): Promise<AddUserType | ApiError> {
  try {
    const { email, password } = userData

    const response = await axios.post(`${port}/user/login`, {
      email,
      password
    })

    const data = response.data as AddUserType
    const token = data.data.token
    const userId = data.data.user._id.toString()

    await storeAuthCredentials(token, userId)

    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}

export async function logOutHandler(): Promise<void> {
  console.log("User's credentials are in the process of being removed.")
  await clearAuthCredentials()
}

export async function getUsersHandler(): Promise<User[] | ApiError> {
  try {
    const users = await User.find().lean()
    return users
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ApiError
    }
    throw error
  }
}
