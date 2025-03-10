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
      getTodos: () => Promise<GetTodosType>
      autoSignIn: () => Promise<void>
      logOut: () => Promise<void>
      completeTodo: (todo: string) => Promise<void>
      uncompleteTodo: (todo: string) => Promise<void>
      deleteTodo: (todo: string) => Promise<void>
      editTodo: (todo: string, newTodo: string) => Promise<Todo>
    }
  }
}
