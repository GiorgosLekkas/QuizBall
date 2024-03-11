import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Question_History, Question_HistoryFormValues } from "../models/Question_History";
import {v4 as uuid} from 'uuid';

export default class Question_HistoryStore {

    question_HistoryRegistry = new Map<string, Question_History>();
    not_confirmed = new Map<string, Question_History>();
    confirmed = new Map<string, Question_History>();
    selectedQuestion_History: Question_History | undefined = undefined;
    tmp = new Map<string, Question_History>();
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    /*get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }*/

    get questions_History() { //let n: number = Math.floor(Math.random() * keys.length);
        /*let keys: string[] = new Array;
        keys = Array.from(this.question_HistoryRegistry.keys());

        if(keys.length>3){
            while(this.tmp.size!=3){
                let n: number = Math.floor(Math.random() * keys.length);
                if(this.tmp.has(keys[n])==false)
                    this.tmp.set(keys[n],this.question_HistoryRegistry.get(keys[n])!);
            }
        }*/
        return Array.from(this.question_HistoryRegistry.values());  
    }

    get questions_HistoryConfirmed() {
        return Array.from(this.confirmed.values());  
    }

    get questions_HistoryNotConfirmed() {
        return Array.from(this.not_confirmed.values());  
    }

    private setQuestion_History = (question: Question_History) => {
        this.question_HistoryRegistry.set(question.id, question);
    }

    private getQuestion_History = (id: string) => {
        return this.question_HistoryRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectQuestion_History = (id: string) => {
        this.selectedQuestion_History = this.question_HistoryRegistry.get(id);
    }

    cancelSelectedQuestion_History = () => {
        this.selectedQuestion_History = undefined;
    }

    openForm = () => {
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    confirmQuestion = async (id: string) => {
        this.loading = true;
        try {
            let question = this.question_HistoryRegistry.get(id);
            if(question){
                question.confirmed = 'true';
                await agent.QuestionHistory.update(question);
                runInAction(() => {
                    if (question) {
                        this.not_confirmed.delete(question.id);
                        this.confirmed.set(question.id,question);
                        let updatedQuestion_History = {...this.getQuestion_History(question.id), ...question}
                        this.question_HistoryRegistry.set(question.id, updatedQuestion_History as Question_History);
                        this.selectedQuestion_History = updatedQuestion_History as Question_History;
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

    loadQuestions_History = async () => {
        this.setLoadingInitial
        try {
            const questions = await agent.QuestionHistory.list();
            questions.forEach(question => {
                if(question.confirmed == 'true')
                    this.confirmed.set(question.id, question);
                else
                    this.not_confirmed.set(question.id, question);
                this.setQuestion_History(question);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadQuestion_History = async (id: string) => {
        let question = this.getQuestion_History(id);
        if (question) {
            this.selectedQuestion_History = question;
            return question;
        } else {
            this.setLoadingInitial(true);
            try {
                question = await agent.QuestionHistory.details(id);
                this.setQuestion_History(question);
                runInAction(() => this.selectedQuestion_History = question);
                this.setLoadingInitial(false);
                return question;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createQuestion_History = async (question: Question_HistoryFormValues) => {
        try {
            question.confirmed = 'false'
            question.id = uuid();
            await agent.QuestionHistory.create(question);
            runInAction(() => {
                this.selectedQuestion_History = question;
                this.not_confirmed.set(question.id,question);
                this.setQuestion_History(question);
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateQuestion_History = async (question: Question_History) => {
        this.loading = true;
        try {
            await agent.QuestionHistory.update(question);
            runInAction(() => {
                runInAction(() => {
                    if (question.id) {
                        let updatedQuestion_History = {...this.getQuestion_History(question.id), ...question}
                        this.question_HistoryRegistry.set(question.id, updatedQuestion_History as Question_History);
                        this.selectedQuestion_History = updatedQuestion_History as Question_History;
                        if(updatedQuestion_History.confirmed == 'true')
                            this.confirmed.set(question.id, updatedQuestion_History);
                        else
                            this.not_confirmed.set(question.id, updatedQuestion_History);
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

    deleteQuestion_History = async (id: string) => {
        this.loading =  true;
        try {
            await agent.QuestionHistory.delete(id);
            runInAction(() => {
                if(this.confirmed.has(id))
                    this.confirmed.delete(id);
                else if(this.not_confirmed.has(id))
                    this.not_confirmed.delete(id);
                this.question_HistoryRegistry.delete(id);
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