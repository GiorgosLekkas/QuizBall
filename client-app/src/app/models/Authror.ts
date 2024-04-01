import { Account } from "./Account";
import { Question } from "./Question";

export interface IAuthor {
    accountId: string
    account: Account
    questionId: string
    question: Question
    isAuthor: boolean
}

export class Author implements IAuthor {
    constructor(user: Account, question: Question){
        this.accountId = user.id
        this.account = user;
        this.questionId = question.id;
        this.question = question;
        this.isAuthor = true;
    }

    accountId: string
    account: Account
    questionId: string
    question: Question
    isAuthor: boolean
}