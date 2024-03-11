export interface IHistoryQuestion {
    id: string
    question: string
    answer1: string
    answer2: string
    correctAnswer: string
    level: string
}

export class HistoryQuestion implements IHistoryQuestion{
    constructor(init: HistoryQuestionFormValues){
        this.id = init.id!
        this.question = init.question!
        this.answer1 = init.answer1!
        this.answer2 = init.answer2!
        this.correctAnswer = init.correctAnswer!
        this.level = init.level!
    }

    id: string
    question: string
    answer1: string
    answer2: string
    correctAnswer: string
    level: string
}

export class HistoryQuestionFormValues {
    id: string = '';
    question: string = '';
    answer1: string = '';
    answer2: string = '';
    correctAnswer: string = '';
    level: string = '';

    constructor(question?: HistoryQuestionFormValues){
        if(question) {
            this.id = question.id;
            this.question = question.question;
            this.answer1 = question.answer1;
            this.answer2 = question.answer2;
            this.correctAnswer = question.correctAnswer;
            this.level = question.level;
        }
    }
}