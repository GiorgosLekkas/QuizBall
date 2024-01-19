import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { HistoryQuestion } from "../models/HistoryQuestion";

export default class HistoryQuestionStore {
    selectedHistoryQuestion: HistoryQuestion | undefined = undefined;
    historyQuestionRegistry = new Map<string, HistoryQuestion>();
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get historyquestions() {
        return Array.from(this.historyQuestionRegistry.values());
    }

    loadHistoryQuestion = async ()  => {
        try {
            const historyQuestions = await agent.HistoryQuestions.list()
                historyQuestions.forEach(question => {
                this.historyQuestionRegistry.set(question.id, question);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);  
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectHistoryQuestion = (id: string) => {
        this.selectedHistoryQuestion = this.historyQuestionRegistry.get(id);
    }

    cancelSelectedHistoryQuestion = () => {
        this.selectedHistoryQuestion = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectHistoryQuestion : this.cancelSelectedHistoryQuestion();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createHistoryQuestion = async (h_question: HistoryQuestion) => {
        this.loading = true;
        h_question.id = uuid();
        try {
            await agent.HistoryQuestions.create(h_question);
            runInAction(() => {
                this.historyQuestionRegistry.set(h_question.id, h_question);
                this.selectedHistoryQuestion = h_question;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    updateHistoryQuestion = async (h_question: HistoryQuestion) => {
        this.loading = true;
        h_question.id = uuid();
        try {
            await agent.HistoryQuestions.create(h_question);
            runInAction(() => {
                this.historyQuestionRegistry.set(h_question.id, h_question);
                this.selectedHistoryQuestion = h_question;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    deleteHistoryQuestion = async (id: string) => {
        this.loading = true;
        try {
            await agent.HistoryQuestions.delete(id);
            runInAction(() => {
                this.historyQuestionRegistry.delete(id);
                if (this.selectedHistoryQuestion?.id === id) this.cancelSelectedHistoryQuestion(); 
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

}