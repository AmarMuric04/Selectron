import { IpcMainInvokeEvent } from 'electron'
import User from '../database/models/User'
import axios from 'axios'
import dotenv from 'dotenv'
import keytar from 'keytar'
import { jwtDecode } from 'jwt-decode'
dotenv.config()
const port = process.env.SERVER_PORT || 'http://localhost:5000'

// Type definition for AddUserType should be defined/imported appropriately
// import { AddUserType } from './types'

// Using a unified service name "Selectron" for storing credentials
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

async function signUserIn(userId: string, token: string): any {
  // console.log(`User ${userId} signed in successfully with token: ${token}`)

  try {
    const response = await axios.post(`${port}/user/auto-sign-in`, { userId })

    return response.data.data
  } catch (error: any) {
    return error.response.data
  }
}

function promptUserToLogIn(): void {
  console.log('No valid credentials found or token expired. Prompting user to log in.')
}

export async function autoSignIn(): Promise<any> {
  const { token, userId } = await getAuthCredentials()
  console.log(token, userId)

  if (token && userId) {
    try {
      const decoded: any = jwtDecode(token)
      if (decoded?.exp * 1000 > Date.now()) {
        const user = await signUserIn(userId, token)

        return user
      } else {
        // await clearAuthCredentials()
        promptUserToLogIn()
        return null
      }
    } catch (error) {
      // await clearAuthCredentials()
      promptUserToLogIn()
      return null
    }
  } else {
    promptUserToLogIn()
    return { user: null }
  }
}

export async function signUpHandler(
  _event: IpcMainInvokeEvent,
  userData: User
): Promise<any | { success: boolean; message: string } | null> {
  try {
    const { password, email, username } = userData

    const response = await axios.post(`${port}/user/signup`, {
      username,
      email,
      password
    })

    const data = response.data as any /* AddUserType */
    const token = data.data.token
    const userId = data.data.user._id

    await storeAuthCredentials(token, userId)

    return data
  } catch (error: any) {
    return error.response.data
  }
}

export async function logInHandler(
  _event: IpcMainInvokeEvent,
  userData: {
    email: string
    password: string
  }
): Promise<any | { success: boolean; message: string } | null> {
  try {
    const { email, password } = userData
    const port = process.env.SERVER_PORT || 'http://localhost:5000'

    const response = await axios.post(`${port}/user/login`, {
      email,
      password
    })

    const data = response.data as any
    const token = data.data.token
    const userId = data.data.user._id.toString()

    await storeAuthCredentials(token, userId)

    return data
  } catch (error: any) {
    return error.response.data
  }
}

export async function getUsersHandler(): Promise<User[] | null> {
  try {
    const users = await User.find().lean()
    return users
  } catch (err) {
    console.error(err)
    return null
  }
}
