export interface Account {
  email: string
  userName: string
  password: string
  firstName: string
  lastName: string
  gender: string
  role: string
  token: string
}

export interface AccountFormValues {
  email: string
  userName?: string
  password: string
  firstName?: string
  lastName?: string
  gender?: string
  role?: string
}