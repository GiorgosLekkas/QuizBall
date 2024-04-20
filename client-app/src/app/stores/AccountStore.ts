import { makeAutoObservable, runInAction } from "mobx";
import { Account, AccountFormValues } from "../models/Account";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import {v4 as uuid} from 'uuid';

export default class AccountStrore {
    user: Account | null = null;
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

    /*private getAccount = (id: string) => {
        return this.accountRegistry.get(id);
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
    }*/

    get Accounts() {
        return Array.from(this.accountRegistry.values());
    }

    loadAccounts = async () => {
        try {
            const accounts = await agent.Accounts.list()
            runInAction(() => {
                accounts.forEach(account => {
                    this.accountRegistry.set(account.id!, account);
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

    openForm = () => {
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    login = async (creds: AccountFormValues) => {
        try {
            const user = await agent.Accounts.login(creds);
            if(user.token){
                store.commonStore.setToken(user.token);
                runInAction(() => this.user = user);
                router.navigate('/categories_selection');
                store.modalStore.closeModal();
            }
        } catch (error) {
            throw (error);
        }
    }

    register = async (creds: AccountFormValues) => {
        try {
            creds.role = 'User'
            creds.id = uuid().toString();
            const user = await agent.Accounts.register(creds);
            if(user.token){
                store.commonStore.setToken(user.token);
                runInAction(() => {
                    this.user = user;
                    this.accountRegistry.set(user.id!,user);
                });
                router.navigate('/categories_selection');
                store.modalStore.closeModal();
            }
        } catch (error) {
            throw (error);
        }
    }

    updateAccount = async (account: Account) => {
        this.loading = true;
        try {
            await agent.Accounts.update(account);
            runInAction(() => {
                if (account.id) {
                    this.accountRegistry.set(account.id, account);
                    //let updatedAccount = {...this.getAccount(account.id), ...account}
                    //this.accountRegistry.set(account.id, updatedAccount as Account);
                    //this.selectedAccount = updatedAccount as Account;
                    if(this.user?.id === account.id)
                        this.user = account;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
        //this.closeForm();
        this.loading = false;
    }

    deleteAccount = async (id: string) => {
        this.loading =  true;
        try {
            await agent.Accounts.delete(id);
            if(this.user?.userName === this.accountRegistry.get(id)?.userName)
                this.logout();
            runInAction(() => {
                this.accountRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
        this.loading = false;
    }

    logout = () => {
        if(store.questionStore.isSet == false) {
            store.commonStore.setToken(null);
            this.user = null;
            router.navigate('/');
        }else 
            router.navigate('/activegame');
    }

    getUser = async () => {
        try {
            const user = await agent.Accounts.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error)
        }
    }

    getRole = () => {
        return this.user?.role;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setImage = (image: string) => {
        if(this.user)
            this.user.image = image;
    }

}