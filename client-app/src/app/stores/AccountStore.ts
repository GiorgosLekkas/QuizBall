import { makeAutoObservable, runInAction } from "mobx";
import { Account, AccountFormValues } from "../models/Account";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import {v4 as uuid} from 'uuid';
import { Photo } from "../models/Profile";

export default class AccountStrore {
    user: Account | null = null;
    user2: Account | undefined = undefined;
    selectedUsers: Account | undefined = undefined;
    accountRegistry = new Map<string, Account>();
    accountByUserName = new Map<string, Account>();
    accountByScore: Account[] = [];
    result : boolean = false;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get Accounts() {
        return Array.from(this.accountRegistry.values());
    }

    SortAccountByScore() {
        this.accountByScore = Array.from(this.accountRegistry.values()).sort((a, b) => (b.totalPoints) - (a.totalPoints));
    }

    setResult(){

        this.result = true;

        if(this.user?.gamesPlayed != null) this.user.gamesPlayed++;
        if(this.user2?.gamesPlayed != null) this.user2.gamesPlayed++;
        if(store.gameStore.score1>store.gameStore.score2) {
            if(this.user?.won != null) this.user.won++;
            if(this.user2?.lost != null) this.user2.lost++;
            if(this.user?.totalPoints != null) this.user.totalPoints += 3;
        } else if(store.gameStore.score1<store.gameStore.score2) {
            if(this.user?.lost != null) this.user.lost++;
            if(this.user2?.won != null) this.user2.won++;
            if(this.user2?.totalPoints != null) this.user2.totalPoints += 3;
        } else {
            if(this.user?.drawn != null) this.user.drawn++;
            if(this.user2?.drawn != null) this.user2.drawn++;
            if(this.user?.totalPoints != null) this.user.totalPoints += 1;
            if(this.user2?.totalPoints != null) this.user2.totalPoints += 1;
        }

        if(this.user?.plus != null) {this.user.plus += store.gameStore.score1;}
        if(this.user?.minus != null) {this.user.minus += store.gameStore.score2;}

        if(this.user2?.plus != null) {this.user2.plus += store.gameStore.score2;}
        if(this.user2?.minus != null) {this.user2.minus += store.gameStore.score1;}

        if(this.user?.plus != null && this.user?.minus != null && this.user?.gamesPlayed != null && this.user?.won != null )  {
            this.user!.plus_Minus = this.user.plus - this.user.minus; 
            this.user!.winrate = Math.round((this.user.won/this.user.gamesPlayed)*100*100)/100;
        }
        if(this.user2?.plus != null && this.user2?.minus != null && this.user2?.gamesPlayed != null && this.user2?.won != null )  {
            this.user2!.plus_Minus = this.user2.plus - this.user2.minus; 
            this.user2!.winrate = Math.round((this.user2.won/this.user2.gamesPlayed)*100*100)/100;
        }

        if(this.user != null) this.updateAccount(this.user);
        if(this.user2 != null) this.updateAccount(this.user2);
    }

    loadAccounts = async () => {
        try {
            const accounts = await agent.Accounts.list()
            runInAction(() => {
                accounts.forEach(account => {
                    this.accountRegistry.set(account.id!, account);
                    this.accountByUserName.set(account.userName!, account);
                    this.SortAccountByScore();
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

    secondUser = async (name: AccountFormValues) => {
        if(name.userName === this.user?.userName){
            throw new Error("");
        }
        try {
            await agent.Profiles.get(name.userName!);
            if(name.userName){
                this.user2 = this.accountByUserName.get(name.userName);
                runInAction(() => {
                    if(this.user2) {
                        router.navigate('/coinflip');
                        store.gameStore.secPlayer = true;
                    }
                });
            }
        } catch (error) {
            router.navigate('/');
            throw (error);
        }
        store.modalStore.closeModal();
    }

    login = async (creds: AccountFormValues) => {
        try {
            const user = await agent.Accounts.login(creds);
            if(user.token){
                store.commonStore.setToken(user.token);
                runInAction(() => this.user = user);
                router.navigate('/');
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
                router.navigate('/');
                store.modalStore.closeModal();
            }
        } catch (error) {
            throw (error);
        }
    }

    updateAccount = async (account: Account) => {
        this.loading = true;
        try {
            console.log(account.photo);
            await agent.Accounts.update(account);
            if(store.profileStore.profile?.userName === account.userName)
                store.profileStore.loadProfile(account.userName);
            runInAction(() => {
                if (account.id) {
                    this.accountRegistry.set(account.id, account);
                    this.accountByUserName.set(account.userName, account);
                    this.SortAccountByScore();
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
        if(store.gameStore.isSet == false) {
            store.commonStore.setToken(null);
            this.user = null;
            router.navigate('/');
        }else 
            router.navigate('/activegame');
    }

    getUser = async () => {
        try {
            const user = await agent.Accounts.current();
            user.image = user.photo?.url;
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

    setImage = (photo: Photo) => {
        if(this.user) {
            this.user.photo = photo;
            this.user.image = photo.url;
        }
    }

}