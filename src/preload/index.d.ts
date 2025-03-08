import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      frameInteraction: (option: string) => void
    }
    api: {
      signUp: (userData: User) => Promise<AddUserType>
      logIn: (userData: { email: string; password: string }) => Promise<AddUserType>
      getUsers: () => Promise<User[]>
      addTodo: (todo: string) => Promise<Todo>
      getTodos: () => Promise<Todo[]>
      autoSignIn: () => Promise<void>
    }
  }
}
