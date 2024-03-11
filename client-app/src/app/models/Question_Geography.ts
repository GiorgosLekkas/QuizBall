export interface IQuestion_Geography {
    id: string
    question: string
    answer1: string
    answer2: string
    correctAnswer: string
    level: string
    confirmed: string
}

export class Question_Geography implements IQuestion_Geography{
    constructor(init: Question_GeographyFormValues){
        this.id = init.id!
        this.question = init.question!
        this.answer1 = init.answer1!
        this.answer2 = init.answer2!
        this.correctAnswer = init.correctAnswer!
        this.level = init.level!
        this.confirmed = init.confirmed!
    }

    id: string
    question: string
    answer1: string
    answer2: string
    correctAnswer: string
    level: string
    confirmed: string
}

export class Question_GeographyFormValues {
  id: string = '';
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  correctAnswer: string = '';
  level: string = '';
  confirmed: string = '';

  constructor(question?: Question_GeographyFormValues){
    if(question) {
        this.id = question.id;
        this.question = question.question;
        this.answer1 = question.answer1;
        this.answer2 = question.answer2;
        this.correctAnswer = question.correctAnswer;
        this.level = question.level;
        this.confirmed = question.confirmed;
    }
}
}