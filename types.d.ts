type User = {
  _id?: string
  username: string
  email: string
  password: string
}

type Todo = string

type Todos = {
  creator: string
  uncompleted: Todo[]
  completed: Todo[]
}

type AddUserType = {
  success: boolean
  message: string
  data: User
}
