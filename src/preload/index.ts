import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  signUp: async (userData: User): Promise<AddUserType> => ipcRenderer.invoke('add-user', userData),
  logIn: async (userData: { email: string; password: string }): Promise<AddUserType> =>
    ipcRenderer.invoke('log-in', userData),
  getUsers: async (): Promise<User[]> => ipcRenderer.invoke('get-users')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
