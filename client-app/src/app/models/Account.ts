export interface IAccount {
  id?: string
  email?: string
  userName?: string
  password?: string
  firstName?: string
  lastName?: string
  gender?: string
  role?: string
  token?: string
  image?: string
}

export interface AccountFormValues {
  id?: string
  email?: string
  userName?: string
  password?: string
  firstName?: string
  lastName?: string
  gender?: string
  role?: string
  token?: string
  image?: string
}

export class Account implements IAccount{
  constructor(init: AccountFormValues){
      this.id = init.id!
      this.email = init.id!
      this.userName = init.userName!
      this.password = init.password!
      this.firstName = init.firstName!
      this.lastName = init.lastName!
      this.gender = init.gender!
      this.role = init.role!
  }

  id: string
  email: string
  userName: string
  password: string
  firstName: string
  lastName: string
  gender: string
  role: string
  token?: string
  image?: string
}

export class AccountFormValues {
  id?: string = ''
  email?: string = ''
  userName?: string = ''
  password?: string = ''
  firstName?: string = ''
  lastName?: string = ''
  gender?: string = ''
  role?: string = ''

  constructor(user?: AccountFormValues){
      if(user) {
        this.id = user.id;
        this.email = user.email;
        this.userName = user.userName;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gender = user.gender;
        this.role = user.role;
      }
  }
}

/*export interface Account {
  id: string
  email: string
  password: string
  userName: string
  firstName: string
  lastName: string
  gender: string
  role: string
  token: string
}

export interface AccountFormValues {
  id: string
  email: string
  password: string
  userName: string
  firstName: string
  lastName: string
  gender: string
  role: string
  token: string
}*/