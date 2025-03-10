type User = {
  _id?: string
  username: string
  email: string
  password: string
  todos?: Todos
}

type Todo = {
  _id: string
  todo: string
  user?: string
}

type Todos = {
  uncompleted: Todo[]
  completed: Todo[]
}

type ValidationError = {
  type?: string
  msg: string
  path: string
  location?: string
  value?: any
}

type ReturnType = {
  success: boolean
  message: string
}

type ApiError = ReturnType & {
  data: ValidationError[]
}

type AddUserType = ReturnType & {
  data: User
}

type GetTodosType = ReturnType & {
  data: Todo[]
}
