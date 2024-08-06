import { Photo, Profile } from "./Profile"

export interface IQuestion {
    id: string
    question: string
    photo?: Photo
    answer1: string
    answer2: string
    correctAnswer1: string
    correctAnswer2: string
    correctAnswer3: string
    correctAnswer4: string
    correctAnswer5: string
    level: string
    confirmed: string
    category: string
    authorName?: string
    author?: Profile
}

export class Question implements IQuestion{
    constructor(init: QuestionFormValues){
        this.id = init.id!
        this.photo = init.photo!
        this.question = init.question!
        this.answer1 = init.answer1!
        this.answer2 = init.answer2!
        this.correctAnswer1 = init.correctAnswer1!
        this.correctAnswer2 = init.correctAnswer2!
        this.correctAnswer3 = init.correctAnswer3!
        this.correctAnswer4 = init.correctAnswer4!
        this.correctAnswer5 = init.correctAnswer5!
        this.level = init.level!
        this.confirmed = init.confirmed!
        this.category = init.category!
        this.authorName = init.authorName!
    }

    id: string
    question: string
    photo?: Photo
    answer1: string
    answer2: string
    correctAnswer1: string
    correctAnswer2: string
    correctAnswer3: string
    correctAnswer4: string
    correctAnswer5: string
    level: string
    confirmed: string
    category: string
    authorName?: string
    author?: Profile
}

export class QuestionFormValues {
  id: string = '';
  question: string = '';
  photo?: Photo = undefined
  answer1: string = '';
  answer2: string = '';
  correctAnswer1: string = '';
  correctAnswer2: string = '';
  correctAnswer3: string = '';
  correctAnswer4: string = '';
  correctAnswer5: string = '';
  level: string = '';
  confirmed: string = '';
  category: string = '';
  authorName?: string = "";

  constructor(question?: QuestionFormValues){
    if(question) {
        this.id = question.id;
        this.question = question.question;
        this.answer1 = question.answer1;
        this.answer2 = question.answer2;
        this.correctAnswer1 = question.correctAnswer1;
        this.correctAnswer2 = question.correctAnswer2;
        this.correctAnswer3 = question.correctAnswer3;
        this.correctAnswer4 = question.correctAnswer4;
        this.correctAnswer5 = question.correctAnswer5;
        this.level = question.level;
        this.confirmed = question.confirmed;
        this.category = question.category;
        this.authorName = question.authorName;
    }
}
}

export interface AnswerQuestion {
    answer: string;
}