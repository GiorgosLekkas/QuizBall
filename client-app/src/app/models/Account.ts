import { Photo } from "./Profile"

export interface IAccount {
  id?: string
  email?: string
  userName?: string
  password?: string
  firstName?: string
  lastName?: string
  gender?: string
  gamesPlayed?: number
  won?: number
  drawn?: number
  lost?: number
  plus?: number
  minus?: number
  winrate?: number
  plus_minus?: number
  totalPoints: number
  role?: string
  token?: string
  photo?: Photo
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
  gamesPlayed?: number
  won?: number
  drawn?: number
  lost?: number
  plus?: number
  minus?: number
  winrate?: number
  plus_Minus?: number
  totalPoints?: number
  photo?: Photo
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
      this.gamesPlayed = init.gamesPlayed!
      this.won = init.won!
      this.drawn = init.drawn!
      this.lost = init.lost!
      this.plus = init.plus!
      this.minus = init.minus!
      this.plus_Minus = init.plus_Minus!
      this.winrate = init.winrate!
      this.totalPoints = init.totalPoints!
      this.image = init.image!
      this.photo = init.photo!
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
  gamesPlayed?: number
  won: number
  drawn?: number
  lost?: number
  plus?: number
  minus?: number
  winrate: number
  plus_Minus: number
  totalPoints: number
  photo?: Photo
}

export class AccountFormValues {
  id?: string = ''
  email?: string = ''
  userName?: string = ''
  password?: string = ''
  firstName?: string = ''
  lastName?: string = ''
  gender?: string = ''
  gamesPlayed?: number = 0
  won?: number = 0
  drawn?: number = 0
  lost?: number = 0
  plus?: number = 0
  minus?: number = 0
  winrate?: number = 0
  plus_Minus?: number = 0
  totalPoints?: number = 0
  role?: string = ''
  image?: string = ''
  photo?: Photo

  constructor(user?: AccountFormValues){
      if(user) {
        this.id = user.id;
        this.email = user.email;
        this.userName = user.userName;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gamesPlayed = user.gamesPlayed;
        this.won = user.won;
        this.drawn = user.drawn;
        this.lost = user.lost;
        this.plus = user.plus;
        this.minus = user.minus;
        this.winrate = user.winrate;
        this.plus_Minus = user.plus_Minus;
        this.totalPoints = user.totalPoints;
        this.gender = user.gender;
        this.role = user.role;
        this.image = user.image!
        this.photo = user.photo!
      }
  }
}