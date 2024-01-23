import { createContext, useContext } from "react";
import HistoryQuestionStore from "./HistoryQuestionStore";
import ModalStore from "./ModalStores";
import AccountStore from "./AccountStore";
import CommonStore from "./CommonStores";

interface Store {
    historyQuestionStore: HistoryQuestionStore
    accountStore: AccountStore
    modalStore: ModalStore;
    commonStore: CommonStore;
}

export const store: Store = {
    historyQuestionStore: new HistoryQuestionStore(),
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}