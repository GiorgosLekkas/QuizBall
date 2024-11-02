import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../models/Profile";
import agent from "../api/agent";
import { store } from "./store";
import { Question } from "../models/Question";

export default class ProfileStore{
    profile: Profile | null = null;
    questions: Question[] | undefined = undefined;
    loadingProfile = false;
    uploading = false;
    deleting = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.accountStore.user && this.profile) {
            return store.accountStore.user.userName === this.profile.userName;
        }
        return false;
    }

    loadProfile = async (userName: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(userName);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
                this.questions = profile.questions?.sort((a, b) => 
                    String(a.category).localeCompare(b.category));
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        console.log(file);
        this.uploading = true;
        try {
            if(this.profile?.photo)
                await agent.Profiles.deletePhoto(this.profile.photo.id);
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if(this.profile) {
                    this.profile.photo = photo;
                    store.accountStore.setImage(photo);
                    this.profile.image = photo.url;
                    store.accountStore.loadAccounts();
                }
                this.uploading = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    deletePhoto = async () => {
        this.deleting = true;
        try {
            if(this.profile !== null && this.profile.photo !== undefined) {
                const result = await agent.Profiles.deletePhoto(this.profile?.photo!.id);
                runInAction(() => {
                    if(result) {
                        if(this.profile) {
                            this.profile.image = undefined;
                            this.profile.photo = null;
                            if(store.accountStore.user) {
                                store.accountStore.user.image = '';
                                store.accountStore.user.photo = undefined;
                                store.accountStore.loadAccounts();
                            }
                        }
                    }
                    this.deleting = false;
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}