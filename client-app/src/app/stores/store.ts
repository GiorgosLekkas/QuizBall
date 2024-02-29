import { createContext, useContext } from "react";
import HistoryQuestionStore from "./HistoryQuestionStore";
import ModalStore from "./ModalStores";
import AccountStore from "./AccountStore";
import CommonStore from "./CommonStores";
import Question_GeographyStore from "./Question_GeographyStore";

interface Store {
    historyQuestionStore: HistoryQuestionStore
    accountStore: AccountStore
    modalStore: ModalStore
    commonStore: CommonStore
    questionGeographyStore: Question_GeographyStore
}

export const store: Store = {
    historyQuestionStore: new HistoryQuestionStore(),
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore(),
    questionGeographyStore: new Question_GeographyStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}