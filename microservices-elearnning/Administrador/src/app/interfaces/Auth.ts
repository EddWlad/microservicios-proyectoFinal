export interface Logintoken {
  success: boolean
  data?: Data
  error: string
}

export interface Data {
  user: User
  token: string
}

export interface User {
  name: string
  lastname: string
  role: string
  email: string
  img: any
}