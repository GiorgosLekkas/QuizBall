import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Question, QuestionFormValues } from "../models/Question";
//import {v4 as uuid} from 'uuid';
import { store } from "./store";
import { Profile } from "../models/Profile";

export default class QuestionStore {

    questionRegistry = new Map<string, Question>();
    not_confirmed = new Map<string, Question>();
    confirmed = new Map<string, Question>();
    selectedQuestion: Question | undefined = undefined;
    tmp = new Map<string, Question>();
    allQuestions = new Map<string, Question>();
    categories: Array<string> = []
    easy = new Map<string, Question>();
    medium = new Map<string, Question>();
    hard = new Map<string, Question>();
    buttons = new Map<string, boolean>();
    questionEasy: Question | undefined = undefined;
    questionMedium: Question | undefined = undefined;
    questionHard: Question | undefined = undefined;
    player1: boolean = false;
    player2: boolean = false;
    coinflip: boolean = false;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isSet() {
        if(this.categories.length === 5)
            return true;
        return false;
    }

    endGame(){
        this.categories = [];
        this.player1 = false;
        this.player2 = false;
        this.coinflip = false;
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

    get questionsByCategory() {
        return Array.from(this.questionRegistry.values()).sort((a,b) =>
            String(a.category).localeCompare(b.category))
    }

    get questionsNotConfirmedByCategory() {
        return Array.from(this.not_confirmed.values()).sort((a,b) =>
            String(a.category).localeCompare(b.category))
    }

    get questionsConfirmedByCategory() {
        return Array.from(this.confirmed.values()).sort((a,b) =>
            String(a.category).localeCompare(b.category))
    }

    gameQuestions(){
        if(this.categories != undefined)
        this.categories.forEach(category => {
            this.easy.clear();
            this.medium.clear();
            this.hard.clear();
            this.confirmed.forEach((value: Question, key: string) => {
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
        console.log(result);
    }

    get allQuestionsGame() {
        return Array.from(this.allQuestions.values());  
    }

    /*get groupedQuestions() {
        return Object.entries(
            this.questionsByCategory.reduce((questions, question) => {
                questions[category] = questions[category] ? [...questions[category], question] : [question];
                return questions;
            }, {} as {[key: string]: Question[]})
        )
    }*/

    get questions() {
        return Array.from(this.questionRegistry.values());  
    }

    get questionsConfirmed() {
        return Array.from(this.confirmed.values());  
    }

    get questionsNotConfirmed() {
        return Array.from(this.not_confirmed.values());  
    }

    private setQuestion = (question: Question) => {
        this.questionRegistry.set(question.id, question);
    }

    private getQuestion = (id: string) => {
        return this.questionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectQuestion = (id: string) => {
        this.selectedQuestion = this.questionRegistry.get(id);
    }

    cancelSelectedQuestion = () => {
        this.selectedQuestion = undefined;
    }

    openForm = (id?:string) => {
        id ? this.selectQuestion(id) : this.cancelSelectedQuestion();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    loadQuestions = async () => {
        this.setLoadingInitial;
        try {
            const questions = await agent.Questions.list();
            questions.forEach(question => {
                if(question.confirmed == 'true')
                    this.confirmed.set(question.id, question);
                else
                    this.not_confirmed.set(question.id, question);
                this.setQuestion(question);
                this.setActivity(question);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadQuestion = async (id: string) => {
        let question = this.getQuestion(id);
        if (question) {
            this.selectedQuestion = question;
            return question;
        } else {
            this.setLoadingInitial(true);
            try {
                question = await agent.Questions.details(id);
                this.setQuestion(question);
                runInAction(() => this.selectedQuestion = question);
                this.setLoadingInitial(false);
                return question;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (question: Question) => {
        this.questionRegistry.set(question.id, question);
        if(question.confirmed == 'true') {
            this.confirmed.set(question.id, question);
        }
        else {
            this.not_confirmed.set(question.id, question);
        }   
    }

    createQuestion = async (question: QuestionFormValues) => {
        store.accountStore.getUser();
        const user = store.accountStore!.user;
        question.confirmed = 'false'
        if(user!.role === 'User') question.category = "Fans Question";
        if(question.category === "Top5"){
            question.answer1 = "-";
            question.answer2 = "-";
        } else {
            question.correctAnswer2 = "-";
            question.correctAnswer3 = "-";
            question.correctAnswer4 = "-";
            question.correctAnswer5 = "-";
        }
        try {
            //question.id = uuid();
            question.authorName = user?.userName;
            await agent.Questions.create(question);
            const newQuestion = new Question(question);
            newQuestion.authorName = user!.userName;
            const profile = new Profile(user!);
            newQuestion.author = profile;
            runInAction(() => {
                this.selectedQuestion = newQuestion;
                this.setActivity(newQuestion);
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateQuestion = async (question: Question) => {
        this.loading = true;
        try {
            if(question.category === "Top5"){
                question.answer1 = "-";
                question.answer2 = "-";
            } else {
                question.correctAnswer2 = "-";
                question.correctAnswer3 = "-";
                question.correctAnswer4 = "-";
                question.correctAnswer5 = "-";
            }
            store.accountStore.getUser();
            await agent.Questions.update(question);
            runInAction(() => {
                if (question.id) {
                    let updatedQuestion = {...this.getQuestion(question.id), ...question}
                    this.questionRegistry.set(question.id, updatedQuestion as Question);
                    this.selectedQuestion = updatedQuestion as Question;
                    this.setActivity(updatedQuestion);
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
        this.closeForm();
    }

    confirmQuestion = async (id: string) => {
        this.loading = true;
        try {
            const question = this.questionRegistry.get(id);
            if(question){
                question.confirmed = 'true';
                await agent.Questions.update(question);
                runInAction(() => {
                    if (question) {
                        this.not_confirmed.delete(question.id);
                        this.confirmed.set(question.id,question);
                        let updatedQuestion = {...this.getQuestion(question.id), ...question}
                        this.questionRegistry.set(question.id, updatedQuestion as Question);
                        this.selectedQuestion = updatedQuestion as Question;
                        this.setActivity(question);
                    }
                })
            }
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
        this.loading = false;
    }

    deleteQuestion = async (id: string) => {
        this.loading =  true;
        try {
            await agent.Questions.delete(id);
            runInAction(() => {
                if(this.confirmed.has(id))
                    this.confirmed.delete(id);
                else if(this.not_confirmed.has(id))
                    this.not_confirmed.delete(id);
                this.questionRegistry.delete(id);
                this.tmp.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}