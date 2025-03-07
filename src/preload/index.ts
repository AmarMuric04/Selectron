import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  addUser: async (userData: User): Promise<AddUserType> => ipcRenderer.invoke('add-user', userData),
  getUsers: async (): Promise<User[]> => ipcRenderer.invoke('get-users'),
  generateText: (prompt: string): Promise<string> => ipcRenderer.invoke('generate-text', prompt)
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
