import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  signUp: async (userData: User): Promise<AddUserType> => ipcRenderer.invoke('add-user', userData),
  logIn: async (userData: { email: string; password: string }): Promise<AddUserType> =>
    ipcRenderer.invoke('log-in', userData),
  getUsers: async (): Promise<User[]> => ipcRenderer.invoke('get-users'),
  addTodo: async (todo: string): Promise<Todo> => ipcRenderer.invoke('add-todo', todo),
  getTodos: async (): Promise<Todo[]> => ipcRenderer.invoke('get-todos'),
  autoSignIn: async (): Promise<void> => ipcRenderer.invoke('auto-sign-in')
}

const extendedElectronAPI = {
  ...electronAPI,
  frameInteraction: (option: string): void => ipcRenderer.send('frame-interaction', option)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', extendedElectronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = extendedElectronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
