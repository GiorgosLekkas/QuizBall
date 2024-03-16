import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Question, QuestionFormValues } from "../models/Question";
import {v4 as uuid} from 'uuid';

export default class QuestionStore {

    questionRegistry = new Map<string, Question>();
    not_confirmed = new Map<string, Question>();
    confirmed = new Map<string, Question>();
    selectedQuestion: Question | undefined = undefined;
    tmp = new Map<string, Question>();
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
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

    /*get groupedQuestions() {
        return Object.entries(
            this.questionsByCategory.reduce((questions, question) => {
                questions[category] = questions[category] ? [...questions[category], question] : [question];
                return questions;
            }, {} as {[key: string]: Question[]})
        )
    }*/

    get questions() { //let n: number = Math.floor(Math.random() * keys.length);
        /*let keys: string[] = new Array;//selectedQuestion
        keys = Array.from(this.questionRegistry.keys());

        if(keys.length>3){
            while(this.tmp.size!=3){
                let n: number = Math.floor(Math.random() * keys.length);
                if(this.tmp.has(keys[n])==false)
                    this.tmp.set(keys[n],this.questionRegistry.get(keys[n])!);
            }
        }*/
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

    confirmQuestion = async (id: string) => {
        this.loading = true;
        try {
            let question = this.questionRegistry.get(id);
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

    loadQuestions = async () => {
        this.setLoadingInitial
        try {
            const questions = await agent.Questions.list();
            questions.forEach(question => {
                if(question.confirmed == 'true')
                    this.confirmed.set(question.id, question);
                else
                    this.not_confirmed.set(question.id, question);
                this.setQuestion(question);
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

    createQuestion = async (question: QuestionFormValues) => {
        try {
            question.confirmed = 'false'
            question.id = uuid();
            await agent.Questions.create(question);
            runInAction(() => {
                this.selectedQuestion = question;
                this.not_confirmed.set(question.id,question);
                this.setQuestion(question);
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateQuestion = async (question: Question) => {
        this.loading = true;
        try {
            await agent.Questions.update(question);
            runInAction(() => {
                runInAction(() => {
                    if (question.id) {
                        let updatedQuestion = {...this.getQuestion(question.id), ...question}
                        this.questionRegistry.set(question.id, updatedQuestion as Question);
                        this.selectedQuestion = updatedQuestion as Question;
                        if(updatedQuestion.confirmed == 'true')
                            this.confirmed.set(question.id, updatedQuestion);
                        else
                            this.not_confirmed.set(question.id, updatedQuestion);
                    }
                })
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
        this.closeForm();
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