type User = {
  _id?: string
  username: string
  email: string
  password: string
  todos?: Todos
}

type Todo = {
  todo: string
}

type Todos = {
  uncompleted: Todo[]
  completed: Todo[]
}

type AddUserType = {
  success: boolean
  message: string
  data: User
}
