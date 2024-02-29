export interface IQuestion_Geography {
    id: string
    question: string
    answer1: string
    answer2: string
    correctAnser: string
    level: string
}

export class Question_Geography implements IQuestion_Geography{
    constructor(init: Question_GeographyFormValues){
        this.id = init.id!
        this.question = init.question!
        this.answer1 = init.answer1!
        this.answer2 = init.answer2!
        this.correctAnser = init.correctAnser!
        this.level = init.level!
    }

    id: string
    question: string
    answer1: string
    answer2: string
    correctAnser: string
    level: string
}

export class Question_GeographyFormValues {
  id: string = '';
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  correctAnser: string = '';
  level: string = '';

  constructor(question?: Question_GeographyFormValues){
    if(question) {
        this.id = question.id;
        this.question = question.question;
        this.answer1 = question.answer1;
        this.answer2 = question.answer2;
        this.correctAnser = question.correctAnser;
        this.level = question.level;
    }
}
}