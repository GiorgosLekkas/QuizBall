import { makeAutoObservable, runInAction } from "mobx";
import { AppUser } from "../models/AppUser";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";

export default class AppUserStore {
    selectedAppUser: AppUser | undefined = undefined;
    appUserRegistry = new Map<string, AppUser>();
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get appusers() {
        return Array.from(this.appUserRegistry.values());
    }

    loadAppUser = async ()  => {
        try {
            const appUser = await agent.AppUsers.list()
            appUser.forEach(user => {
                this.appUserRegistry.set(user.id, user);
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

    selectAppUser = (id: string) => {
        this.selectedAppUser = this.appUserRegistry.get(id);
    }

    cancelSelectedAppUser = () => {
        this.selectedAppUser = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectAppUser : this.cancelSelectedAppUser();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createAppUser = async (user: AppUser) => {
        this.loading = true;
        user.id = uuid();
        try {
            await agent.AppUsers.create(user);
            runInAction(() => {
                this.appUserRegistry.set(user.id, user);
                this.selectedAppUser = user;
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

    updateAppUser = async (user: AppUser) => {
        this.loading = true;
        try {
            await agent.AppUsers.update(user);
            runInAction(() => {
                this.appUserRegistry.set(user.id, user);
                this.selectedAppUser = user;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteAppUser = async (id: string) => {
        this.loading = true;
        try {
            await agent.AppUsers.delete(id);
            runInAction(() => {
                this.appUserRegistry.delete(id);
                if (this.selectedAppUser?.id === id) this.cancelSelectedAppUser(); 
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    register = async (creds: any) => {
        try {
            console.log();
        } catch (error) {
            throw (error);
        }
    }
}