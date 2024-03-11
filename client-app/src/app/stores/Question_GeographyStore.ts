import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Question_Geography, Question_GeographyFormValues } from "../models/Question_Geography";
import {v4 as uuid} from 'uuid';

export default class Question_GeographyStore {

    question_GeographyRegistry = new Map<string, Question_Geography>();
    not_confirmed = new Map<string, Question_Geography>();
    confirmed = new Map<string, Question_Geography>();
    easy = new Map<string, Question_Geography>();
    medium = new Map<string, Question_Geography>();
    hard = new Map<string, Question_Geography>();
    question_GeographyEasy: Question_Geography | undefined = undefined;
    question_GeographyMedium: Question_Geography | undefined = undefined;
    question_GeographyHard: Question_Geography | undefined = undefined;
    selectedQuestion_Geography: Question_Geography | undefined = undefined;
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

    questions_Geography() { //let n: number = Math.floor(Math.random() * keys.length);
        this.question_GeographyRegistry.forEach((value: Question_Geography, key: string) => {
            if(value.level === "Easy")
                this.easy.set(value.id, value);
            if(value.level === "Medium")
                this.medium.set(value.id, value);
            if(value.level === "Hard")
                this.hard.set(value.id, value);
        });

        let ekeys: string[] = new Array;
        ekeys = Array.from(this.easy.keys());
        let ne: number = Math.floor(Math.random() * ekeys.length);
        this.question_GeographyEasy = this.easy.get(ekeys[ne]);

        let mkeys: string[] = new Array;
        mkeys = Array.from(this.medium.keys());
        let nm: number = Math.floor(Math.random() * mkeys.length);
        this.question_GeographyMedium = this.medium.get(mkeys[nm]);

        let hkeys: string[] = new Array;
        hkeys = Array.from(this.hard.keys());
        let nh: number = Math.floor(Math.random() * hkeys.length);
        this.question_GeographyHard = this.hard.get(hkeys[nh]);
    }

    get questions_GeographyConfirmed() {
        return Array.from(this.confirmed.values());  
    }

    get questions_GeographyNotConfirmed() {
        return Array.from(this.not_confirmed.values());  
    }

    private setQuestion_Geography = (question: Question_Geography) => {
        this.question_GeographyRegistry.set(question.id, question);
    }

    private getQuestion_Geography = (id: string) => {
        return this.question_GeographyRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectQuestion_Geography = (id: string) => {
        this.selectedQuestion_Geography = this.question_GeographyRegistry.get(id);
    }

    cancelSelectedQuestion_Geography = () => {
        this.selectedQuestion_Geography = undefined;
    }

    openForm = (id?:string) => {
        id ? this.selectQuestion_Geography(id) : this.cancelSelectedQuestion_Geography();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    confirmQuestion = async (id: string) => {
        this.loading = true;
        try {
            let question = this.question_GeographyRegistry.get(id);
            if(question){
                question.confirmed = 'true';
                await agent.QuestionGeography.update(question);
                runInAction(() => {
                    if (question) {
                        this.not_confirmed.delete(question.id);
                        this.confirmed.set(question.id,question);
                        let updatedQuestion_Geography = {...this.getQuestion_Geography(question.id), ...question}
                        this.question_GeographyRegistry.set(question.id, updatedQuestion_Geography as Question_Geography);
                        this.selectedQuestion_Geography = updatedQuestion_Geography as Question_Geography;
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

    loadQuestions_Geography = async () => {
        this.setLoadingInitial
        try {
            const questions = await agent.QuestionGeography.list();
            questions.forEach(question => {
                if(question.confirmed == 'true')
                    this.confirmed.set(question.id, question);
                else
                    this.not_confirmed.set(question.id, question);
                this.setQuestion_Geography(question);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
        this.questions_Geography();
    }

    loadQuestion_Geography = async (id: string) => {
        let question = this.getQuestion_Geography(id);
        if (question) {
            this.selectedQuestion_Geography = question;
            return question;
        } else {
            this.setLoadingInitial(true);
            try {
                question = await agent.QuestionGeography.details(id);
                this.setQuestion_Geography(question);
                runInAction(() => this.selectedQuestion_Geography = question);
                this.setLoadingInitial(false);
                return question;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createQuestion_Geography = async (question: Question_GeographyFormValues) => {
        try {
            question.confirmed = 'false'
            question.id = uuid();
            await agent.QuestionGeography.create(question);
            runInAction(() => {
                this.selectedQuestion_Geography = question;
                this.not_confirmed.set(question.id,question);
                this.setQuestion_Geography(question);
            });
        } catch (error) {
            console.log(error);
        }
        this.closeForm();
    }

    updateQuestion_Geography = async (question: Question_Geography) => {
        this.loading = true;
        try {
            await agent.QuestionGeography.update(question);
            runInAction(() => {
                runInAction(() => {
                    if (question.id) {
                        let updatedQuestion_Geography = {...this.getQuestion_Geography(question.id), ...question}
                        this.question_GeographyRegistry.set(question.id, updatedQuestion_Geography as Question_Geography);
                        this.selectedQuestion_Geography = updatedQuestion_Geography as Question_Geography;
                        if(updatedQuestion_Geography.confirmed == 'true')
                            this.confirmed.set(question.id, updatedQuestion_Geography);
                        else
                            this.not_confirmed.set(question.id, updatedQuestion_Geography);
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

    deleteQuestion_Geography = async (id: string) => {
        this.loading =  true;
        try {
            await agent.QuestionGeography.delete(id);
            runInAction(() => {
                if(this.confirmed.has(id))
                    this.confirmed.delete(id);
                else if(this.not_confirmed.has(id))
                    this.not_confirmed.delete(id);
                this.question_GeographyRegistry.delete(id);
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