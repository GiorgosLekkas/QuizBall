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
    category: String = '';
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

    setCategory(category: String) {
        this.category = category;
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
        this.category = '';
    }

    loadQuestions = async () => {
        this.setLoadingInitial;
        try {
            const questions = await agent.Questions.list();
            questions.forEach(question => {
                runInAction(() => {
                    if(question.confirmed == 'true')
                        this.confirmed.set(question.id, question);
                    else
                        this.not_confirmed.set(question.id, question);
                    this.setQuestion(question);
                    this.setActivity(question);
                })
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

    createQuestion = async (question: QuestionFormValues, photo: Blob) => {
        console.log(photo);
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
        /*try {
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
        }*/

        try {
            //question.id = uuid();
            question.authorName = user?.userName;
            await agent.Questions.addPhoto(question ,photo);
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

    updateQuestion = async (question: Question, photo: Blob) => {
        store.accountStore.getUser();
        const user = store.accountStore!.user;
        try {
            //question.id = uuid();
            question.authorName = user?.userName;
            await agent.Questions.addPhoto(question,photo);
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
        /*this.loading = true;
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
        this.closeForm();*/
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