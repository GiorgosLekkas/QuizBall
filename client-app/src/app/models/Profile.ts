import { Account } from "./Account";

export interface Profile {
    email: string
    userName: string
    firstName: string
    lastName: string
    gender: string
    role: string
    photo?: Photo
}

export class Profile implements Profile {
    constructor(user: Account){
        this.email = user.email;
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.gender = user.gender;
        this.role = user.role;
        this.image = user.image;
    }

    email: string
    userName: string
    firstName: string
    lastName: string
    gender: string
    role: string
    image?: string
}

export interface Photo {
    id: string;
    url: string;
}
