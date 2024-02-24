import { makeAutoObservable, runInAction } from "mobx";
import { Account, AccountFormValues } from "../models/Account";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: Account | null = null;
    accounts: Account[] = [];
    selectedUsers: Account | undefined = undefined;
    accountRegistry = new Map<string, Account>();
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get getAccounts() {
        return Array(this.accounts).values();
    }

    loadAccounts = async ()  => {
        try {
            const account = await agent.Account.list()
            runInAction(() => {
                account.forEach(acc => {
                    this.accounts.push(acc);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);  
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    login = async (creds: AccountFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/historyquestions');
            store.modalStore.closeModal();
        } catch (error) {
            throw (error);
        }
    }

    register = async (creds: AccountFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/historyquestions');
            store.modalStore.closeModal();
        } catch (error) {
            throw (error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error)
        }
    }

    getRole = () => {
        if(this.user?.role === 'Admin')
            return true;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}