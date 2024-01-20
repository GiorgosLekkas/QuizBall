import { createContext, useContext } from "react";
import HistoryQuestionStore from "./HistoryQuestionStore";
import AppUserStore from "./AppUserStore";
import ModalStore from "./ModalStores";

interface Store {
    historyQuestionStore: HistoryQuestionStore
    appUserStore: AppUserStore
    modalStore: ModalStore;
}

export const store: Store = {
    historyQuestionStore: new HistoryQuestionStore(),
    appUserStore: new AppUserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}