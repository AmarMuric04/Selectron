import { app, IpcMainInvokeEvent } from 'electron'
import User from '../database/models/User'
import { safeStorage } from 'electron'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const userDataPath = app.getPath('userData')
const storagePath = path.join(userDataPath, 'user-data.json')

function saveUserData(user: AddUserType): void {
  const encryptedToken = safeStorage.encryptString(user.token)
  const encryptedExpiry = safeStorage.encryptString(user.expiry.toString())

  const data = {
    id: user._id,
    token: encryptedToken.toString('base64'),
    expiry: encryptedExpiry.toString('base64')
  }

  fs.writeFileSync(storagePath, JSON.stringify(data), 'utf-8')
}

function getUserData() {
  if (!fs.existsSync(storagePath)) return null

  const data = JSON.parse(fs.readFileSync(storagePath, 'utf-8'))

  const decryptedToken = safeStorage.decryptString(Buffer.from(data.token, 'base64'))
  const decryptedExpiry = safeStorage.decryptString(Buffer.from(data.expiry, 'base64'))

  return {
    id: data.id,
    token: decryptedToken,
    expiry: parseInt(decryptedExpiry, 10)
  }
}

export async function addUserHandler(
  _event: IpcMainInvokeEvent,
  userData: User
): Promise<AddUserType | null> {
  try {
    const { password, email, username } = userData

    const port = process.env.SERVER_PORT || 'http://localhost:5000'

    const response = await axios.post(`${port}/user/signup`, {
      username,
      email,
      password
    })

    return response.data as AddUserType
  } catch (error) {
    console.error('Error adding user:', error)
    return null
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
