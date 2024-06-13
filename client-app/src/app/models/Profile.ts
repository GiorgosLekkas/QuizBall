import { Account } from "./Account";
import { Question } from "./Question";

export interface Profile {
    email: string
    userName: string
    firstName: string
    lastName: string
    gender: string
    role: string
    photo?: Photo
    questions?: Question[]
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
    questions?: Question[]
}

export interface Photo {
    id: string;
    url: string;
}
