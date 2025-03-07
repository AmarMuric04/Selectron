type User = {
  _id?: string
  username: string
  email: string
  password: string
}

type AddUserType = {
  _id: string
  user: User
  token: string
  expiry: string
}
