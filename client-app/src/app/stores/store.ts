import { createContext, useContext } from "react";
import HistoryQuestionStore from "./HistoryQuestionStore";
import AppUserStore from "./AppUserStore";

interface Store {
    historyQuestionStore: HistoryQuestionStore
    appUserStore: AppUserStore
}

export const store: Store = {
    historyQuestionStore: new HistoryQuestionStore(),
    appUserStore: new AppUserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}