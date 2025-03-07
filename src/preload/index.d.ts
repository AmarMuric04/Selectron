import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      addUser: (userData: User) => Promise<AddUserType>
      getUsers: () => Promise<User[]>
      generateText: (prompt: string) => Promise<string>
    }
  }
}
