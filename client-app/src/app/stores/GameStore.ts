import { makeAutoObservable, runInAction } from "mobx";
import { AnswerQuestion, Question } from "../models/Question";
import { store } from "./store";
import { router } from "../router/Routes";

export default class GameStrore {

    categories: Array<string> = []
    top5_answers: Array<string> = ['', '', '', '', '', '']
    user1: string = '';
    user2: string = '';
    easy = new Map<string, Question>();
    medium = new Map<string, Question>();
    hard = new Map<string, Question>();
    buttons = new Map<string, boolean>();
    allQuestions = new Map<string, Question>();
    questionEasy: Question | undefined = undefined;
    questionMedium: Question | undefined = undefined;
    questionHard: Question | undefined = undefined;
    selectedQuestion: Question | undefined = undefined;
    lastQuestion: Question | undefined = undefined;
    player1: boolean = false;
    player2: boolean = false;
    fiftyfifty1: string = 'false';
    fiftyfifty2: string = 'false';
    double1: string = 'false';
    double2: string = 'false';
    telephone1: boolean = false;
    telephone2: boolean = false;
    score1 = 0;
    score2 = 0;
    coinflip: boolean = false;
    secPlayer: boolean = false;
    questionIsSelected: boolean = false;
    correctAnswersTop5: number = 0;
    wrongAnswersTop5: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    get isSet() {
        if(this.categories.length === 5)
            return true;
        return false;
    }

    endGame(){
        store.accountStore.setResult();
        this.categories = [];
        this.player1 = false;
        this.player2 = false;
        this.coinflip = false;
        this.secPlayer = false;
        this.fiftyfifty1 = 'false';
        this.fiftyfifty2 = 'false';
        this.double1 = 'false';
        this.double2 = 'false';
        this.telephone1 = false;
        this.telephone2 = false;
    }

    easyButton(str: string) {
        //this.changePlayer(
        this.buttons.set(str, false);
        this.questionIsSelected = true;
    }

    mediumButton(str: string) {
        //this.changePlayer();
        this.buttons.set(str, false);
        this.questionIsSelected = true;
    }

    hardButton(str: string) {
        //this.changePlayer();
        this.buttons.set(str, false);
        this.questionIsSelected = true;
    }

    hintDouble() {
        if(this.player1)
            if(this.double1 === 'false' && this.questionIsSelected === false) this.double1 = 'active';
        if(this.player2)
            if(this.double2 === 'false' && this.questionIsSelected === false) this.double2 = 'active';
    }

    hintFiftyFifty() {
        if(this.selectedQuestion?.category !== 'Top5'){
            if(this.player1)
                if(this.fiftyfifty1 === 'false' && this.questionIsSelected === true) this.fiftyfifty1 = 'active';
            if(this.player2)
                if(this.fiftyfifty2 === 'false' && this.questionIsSelected === true) this.fiftyfifty2 = 'active';
            console.log(this.selectedQuestion?.category);
        }
    }

    hintTelephone() {
        if(this.player1)
            if(this.telephone1 === false && this.questionIsSelected === true) this.telephone1 = true;
        if(this.player2)
            if(this.telephone2 === false && this.questionIsSelected === true) this.telephone2 = true;
    }

    answering(question: Question, q: AnswerQuestion) {
        runInAction(() => {
            this.lastQuestion = question;
        });
        var score = 0;
        if(question.category === 'Top5') {
            if(question.correctAnswer1.toUpperCase() === q.answer.toUpperCase() && this.top5_answers.includes(q.answer.toUpperCase())===false){
                this.top5_answers[0] = question.correctAnswer1;
                this.correctAnswersTop5++;
            } else if(question.correctAnswer2.toUpperCase() === q.answer.toUpperCase() && this.top5_answers.includes(q.answer.toUpperCase())===false){
                this.top5_answers[1] = question.correctAnswer2;
                this.correctAnswersTop5++;
            } else if(question.correctAnswer3.toUpperCase() === q.answer.toUpperCase() && this.top5_answers.includes(q.answer.toUpperCase())===false){
                this.top5_answers[2] = question.correctAnswer3;
                this.correctAnswersTop5++;
            } else if(question.correctAnswer4.toUpperCase() === q.answer.toUpperCase() && this.top5_answers.includes(q.answer.toUpperCase())===false){
                this.top5_answers[3] = question.correctAnswer4;
                this.correctAnswersTop5++;
            } else if(question.correctAnswer5.toUpperCase() === q.answer.toUpperCase() && this.top5_answers.includes(q.answer.toUpperCase())===false){
                this.top5_answers[4] = question.correctAnswer5;
                this.correctAnswersTop5++;
            } else{
                this.top5_answers[5] = q.answer;
                this.wrongAnswersTop5++;
            }

            if(this.wrongAnswersTop5 === 2){
                this.changePlayer();
                this.questionIsSelected = false;
                this.clearTop5();
                router.navigate('/wrong');
            }
            if(this.correctAnswersTop5 === 5){
                if(this.player2) {
                    if(this.double2 === 'active') this.score2 += 6;
                    else this.score2 += 3;
                }else if(this.player1) {
                    if(this.double1 === 'active') this.score1 += 6;
                    else this.score1 += 3;
                }
                this.changePlayer();
                this.questionIsSelected = false;
                this.clearTop5();
                router.navigate('/correct');
            }
        } else {
            if(question.correctAnswer1.toUpperCase() === q.answer.toUpperCase()){
                if(question.level === 'Easy') score = 1;
                if(question.level === 'Medium') score = 2;
                if(question.level === 'Hard') score = 3;
                if(this.player2) {
                    if(this.double2 === 'active') this.score2 += score*2;
                    else if(this.fiftyfifty2 === 'active') this.score2 += 1;
                    else this.score2 += score;
                }else if(this.player1) {
                    if(this.double1 === 'active') this.score1 += score*2;
                    else if(this.fiftyfifty1 === 'active') this.score1 += 1;
                    else this.score1 += score;
                }
                router.navigate('/correct');
            } else {
                router.navigate('/wrong');
            }
            this.changePlayer();
            this.questionIsSelected = false;
        }
    }

    changePlayer(){
        if(this.player1){
            this.player1 = false;
            this.player2 = true;
        }else {
            this.player2 = false;
            this.player1 = true;
        }
        this.clearHints();
    }

    setPlayer(result: string){
        if(result === 'heads') {
            this.player1 = true;
            this.player2 = false;
        }else if(result === 'tails') {
            this.player1 = false;
            this.player2 = true;
        }
        this.coinflip = true;
    }

    stopTop5() {
        if(this.player2) {
            if(this.double2 === 'active') this.score2 += 2;
            else this.score2 += 1;
        }else if(this.player1) {
            if(this.double1 === 'active') this.score1 += 2;
            else this.score1 += 1;
        }
        this.changePlayer();
        this.questionIsSelected = false;
        this.clearTop5();
        router.navigate('/correct');
    }

    clearHints() {
        if(this.double2 === 'active') this.double2 = 'true';
        if(this.fiftyfifty2 === 'active') this.fiftyfifty2 = 'true';
        if(this.double1 === 'active') this.double1 = 'true';
        if(this.fiftyfifty1 === 'active') this.fiftyfifty1 = 'true';
    }

    clearTop5() {
        this.top5_answers[0] = '';
        this.top5_answers[1] = '';
        this.top5_answers[2] = '';
        this.top5_answers[3] = '';
        this.top5_answers[4] = '';
        this.top5_answers[5] = '';
        this.correctAnswersTop5 = 0;
        this.wrongAnswersTop5 = 0;
    }

    gameQuestions(){

        store.accountStore.result = false;

        this.score1 = 0;
        this.score2 = 0;

        if(store.accountStore.user)
            this.user1 = store.accountStore.user?.userName;
        if(store.accountStore.user2)
            this.user2 = store.accountStore.user2?.userName;
        if(this.categories != undefined)
        this.categories.forEach(category => {
            this.easy.clear();
            this.medium.clear();
            this.hard.clear();
            store.questionStore.confirmed.forEach((value: Question, key: string) => {
                key;
                if(value.level === "Easy" && category === value.category) 
                    this.easy.set(value.id, value);
                if(value.level === "Medium" && category === value.category)
                    this.medium.set(value.id, value);
                if(value.level === "Hard" && category === value.category)
                    this.hard.set(value.id, value);
            });

            
            if(category === 'Higher Lower'){
                for (var i = 0; i < 3; i++) {
                    let ekeys: string[] = new Array;
                    ekeys = Array.from(this.easy.keys());
                    let ne: number = Math.floor(Math.random() * ekeys.length);
                    this.questionEasy = this.easy.get(ekeys[ne]);
                    this.easy.delete(ekeys[ne]);
                    var q = new Question(this.questionEasy!);
                    q!.level = 'Easy_' + (i+1);

                    if(q) this.allQuestions.set(category + ' easy_' + (i+1), q);
                    this.buttons.set(category + ' Easy_' + (i+1), true);
                }
            } else if(category === 'Player id' || category === 'Manager id'){
                for (var i = 0; i < 3; i++) {
                    let mkeys: string[] = new Array;
                    mkeys = Array.from(this.medium.keys());
                    let nm: number = Math.floor(Math.random() * mkeys.length);
                    this.questionMedium = this.medium.get(mkeys[nm]);
                    this.medium.delete(mkeys[nm]);
                    var q = new Question(this.questionMedium!);
                    q!.level = 'Medium_' + (i+1);

                    if(q) this.allQuestions.set(category + ' medium_' + (i+1), q);
                    this.buttons.set(category + ' Medium_' + (i+1), true);
                }
            } else if(category === 'Top5'){
                for (var i = 0; i < 3; i++) {
                    let hkeys: string[] = new Array;
                    hkeys = Array.from(this.hard.keys());
                    let nh: number = Math.floor(Math.random() * hkeys.length);
                    this.questionHard = this.hard.get(hkeys[nh]);
                    this.hard.delete(hkeys[nh]);
                    var q = new Question(this.questionHard!);
                    q!.level = 'Hard_' + (i+1);

                    if(q) this.allQuestions.set(category + ' hard_' + (i+1), q);
                    this.buttons.set(category + ' Hard_' + (i+1), true);
                }
            } else if(category === 'Who Is Missing'){
                for (var i = 0; i < 3; i++) {
                    let hkeys: string[] = new Array;
                    hkeys = Array.from(this.hard.keys());
                    let nh: number = Math.floor(Math.random() * hkeys.length);
                    this.questionHard = this.hard.get(hkeys[nh]);
                    this.hard.delete(hkeys[nh]);
                    var q = new Question(this.questionHard!);
                    q!.level = 'Hard_' + (i+1);

                    if(q) this.allQuestions.set(category + ' hard_' + (i+1), q);
                    this.buttons.set(category + ' Hard_' + (i+1), true);
                }
            } else {
                let ekeys: string[] = new Array;
                ekeys = Array.from(this.easy.keys());
                let ne: number = Math.floor(Math.random() * ekeys.length);
                this.questionEasy = this.easy.get(ekeys[ne]);
        
                let mkeys: string[] = new Array;
                mkeys = Array.from(this.medium.keys());
                let nm: number = Math.floor(Math.random() * mkeys.length);
                this.questionMedium = this.medium.get(mkeys[nm]);
        
                let hkeys: string[] = new Array;
                hkeys = Array.from(this.hard.keys());
                let nh: number = Math.floor(Math.random() * hkeys.length);
                this.questionHard = this.hard.get(hkeys[nh]);
    
                if(this.questionEasy) this.allQuestions.set(category + ' easy',this.questionEasy);
                if(this.questionMedium) this.allQuestions.set(category + ' medium',this.questionMedium);
                if(this.questionHard) this.allQuestions.set(category + ' hard',this.questionHard);
    
                this.buttons.set(category + ' Easy', true);
                this.buttons.set(category + ' Medium', true);
                this.buttons.set(category + ' Hard', true);
            }
        });
    }

    get allQuestionsGame() {
        return Array.from(this.allQuestions.values());  
    }

    openForm = (id?:string) => {
        if(id)this.selectQuestion(id);
    }

    selectQuestion = (id: string) => {
        this.selectedQuestion = store.questionStore.questionRegistry.get(id);
        console.log(this.selectedQuestion?.category);
    }
    
}