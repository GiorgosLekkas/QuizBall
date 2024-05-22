import { createContext, useContext } from "react";
import ModalStore from "./ModalStores";
import AccountStore from "./AccountStore";
import CommonStore from "./CommonStores";
import Question_GeographyStore from "./Question_GeographyStore";
import Question_HistoryStore from "./Question_HistoryStore";
import QuestionStore from "./QuestionStore";
import ProfileStore from "./ProfileStore";
import GameStore from "./GameStore";

interface Store {
    accountStore: AccountStore
    modalStore: ModalStore
    commonStore: CommonStore
    questionGeographyStore: Question_GeographyStore
    questionHistoryStore: Question_HistoryStore
    questionStore: QuestionStore
    profileStore: ProfileStore
    gameStore: GameStore
}

export const store: Store = {
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    questionGeographyStore: new Question_GeographyStore(),
    questionHistoryStore: new Question_HistoryStore(),
    questionStore: new QuestionStore(),
    profileStore: new ProfileStore(),
    gameStore: new GameStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}