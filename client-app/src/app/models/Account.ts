export interface Account {
  id?: string
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
  id?: string
  email: string
  userName?: string
  password: string
  firstName?: string
  lastName?: string
  gender?: string
  role?: string
}