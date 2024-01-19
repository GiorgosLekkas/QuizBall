import { createContext, useContext } from "react";
import HistoryQuestionStore from "./HistoryQuestionStore";

interface Store {
    historyQuestionStore: HistoryQuestionStore
}

export const store: Store = {
    historyQuestionStore: new HistoryQuestionStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}