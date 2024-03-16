export interface IQuestion {
    id: string
    question: string
    answer1: string
    answer2: string
    correctAnswer: string
    level: string
    confirmed: string
    category: string
}

export class Question implements IQuestion{
    constructor(init: QuestionFormValues){
        this.id = init.id!
        this.question = init.question!
        this.answer1 = init.answer1!
        this.answer2 = init.answer2!
        this.correctAnswer = init.correctAnswer!
        this.level = init.level!
        this.confirmed = init.confirmed!
        this.category = init.category!
    }

    id: string
    question: string
    answer1: string
    answer2: string
    correctAnswer: string
    level: string
    confirmed: string
    category: string
}

export class QuestionFormValues {
  id: string = '';
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  correctAnswer: string = '';
  level: string = '';
  confirmed: string = '';
  category: string = '';

  constructor(question?: QuestionFormValues){
    if(question) {
        this.id = question.id;
        this.question = question.question;
        this.answer1 = question.answer1;
        this.answer2 = question.answer2;
        this.correctAnswer = question.correctAnswer;
        this.level = question.level;
        this.confirmed = question.confirmed;
        this.category = question.category;
    }
}
}