import { makeAutoObservable, runInAction } from "mobx";
import { AnswerQuestion, Question } from "../models/Question";
import { store } from "./store";
import { router } from "../router/Routes";

export default class GameStrore {

    categories: Array<string> = []
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
    score1 = 0;
    score2 = 0;
    coinflip: boolean = false;
    secPlayer: boolean = false;

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
    }

    easyButton(str: string) {
        this.changePlayer();
        this.buttons.set(str, false);
    }

    mediumButton(str: string) {
        this.changePlayer();
        this.buttons.set(str, false);
    }

    hardButton(str: string) {
        this.changePlayer();
        this.buttons.set(str, false);
    }

    answering(question: Question, q: AnswerQuestion) {
        runInAction(() => {this.lastQuestion = question;});
        var score = 0;
        if(question.correctAnswer1.toUpperCase() === q.answer.toUpperCase()){
            if(question.level === 'Easy') score = 1;
            if(question.level === 'Medium') score = 2;
            if(question.level === 'Hard') score = 3;
            if(this.player1)
                this.score2 = score;
            else if(this.player2)
                this.score1 = score;
            router.navigate('/correct');
        } else {
            router.navigate('/wrong');
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

    gameQuestions(){

        this.score1 = 0;
        this.score2 = 0;
        this.player1 = false;
        this.player2 = false;

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
            }else if(category === 'Top5' || category === 'Who Is Missing'){
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
            }else {
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
        this.selectedQuestion = this.allQuestions.get(id);
    }
    
}