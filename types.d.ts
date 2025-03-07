type User = {
  _id?: string
  username: string
  email: string
  password: string
}

type Todo = {
  creator: string
  uncompleted: string[]
  completed: string[]
}

type AddUserType = {
  success: boolean
  message: string
  data: User
}
