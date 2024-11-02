import { createContext, useContext } from "react";
import ModalStore from "./ModalStores";
import AccountStore from "./AccountStore";
import CommonStore from "./CommonStores";
import QuestionStore from "./QuestionStore";
import ProfileStore from "./ProfileStore";
import GameStore from "./GameStore";

interface Store {
    accountStore: AccountStore
    modalStore: ModalStore
    commonStore: CommonStore
    questionStore: QuestionStore
    profileStore: ProfileStore
    gameStore: GameStore
}

export const store: Store = {
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    questionStore: new QuestionStore(),
    profileStore: new ProfileStore(),
    gameStore: new GameStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}