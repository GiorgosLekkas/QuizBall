import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Question_Geography, Question_GeographyFormValues } from "../models/Question_Geography";
import {v4 as uuid} from 'uuid';
import { number } from "yup";

export default class Question_GeographyStore {

    question_GeographyRegistry = new Map<string, Question_Geography>();
    selectedQuestion_Geography: Question_Geography | undefined = undefined;
    tmp = new Map<string, Question_Geography>();
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

    get questions_Geography() {
        /*let keys: string[] = new Array;
        keys = Array.from(this.question_GeographyRegistry.keys());

        let nums : number[] = new Array;
        if(keys.length>=3 && this.tmp.size<3){
            var i = 0;
            for (i = 0; i<3; i++){
                let n: number = Math.floor(Math.random() * keys.length);
                //if(!nums.includes(n)){
                    nums[i] = n;
                //}
            }
            console.log(nums);
            let val: Question_Geography | undefined = this.question_GeographyRegistry.get(keys[nums[0]]);
            this.tmp.set(keys[nums[0]],val!);
            val = this.question_GeographyRegistry.get(keys[nums[1]]);
            this.tmp.set(keys[nums[1]],val!);
            val = this.question_GeographyRegistry.get(keys[nums[2]]);
            this.tmp.set(keys[nums[2]],val!);

        }
        return Array.from(this.tmp.values());*/
        return Array.from(this.question_GeographyRegistry.values());
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

    openForm = (id?: string) => {
        id ? this.selectQuestion_Geography : this.cancelSelectedQuestion_Geography();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    loadQuestions_Geography = async () => {
        this.setLoadingInitial
        try {
            const questions = await agent.QuestionGeography.list();
            questions.forEach(question => {
                this.setQuestion_Geography(question);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
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
            await agent.QuestionGeography.create(question);
            const newQeustion = new Question_Geography(question);
            newQeustion.id = uuid();
            this.setQuestion_Geography(newQeustion);
            this.editMode = false;
            this.closeForm();
            runInAction(() => this.selectedQuestion_Geography = newQeustion);
        } catch (error) {
            console.log(error);
        }
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
                    }
                })
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    deleteQuestion_Geography = async (id: string) => {
        this.loading =  true;
        try {
            await agent.QuestionGeography.delete(id);
            runInAction(() => {
                this.question_GeographyRegistry.delete(id);
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