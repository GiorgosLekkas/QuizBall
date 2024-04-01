import { Account } from "./Account";

export interface IProfile {
    email: string
    userName: string
    firstName: string
    lastName: string
    gender: string
    role: string
}

export class Profile implements IProfile {
    constructor(user: Account){
        this.email = user.email;
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gender = user.gender;
        this.role = user.role;
    }

    email: string
    userName: string
    firstName: string
    lastName: string
    gender: string
    role: string
}
