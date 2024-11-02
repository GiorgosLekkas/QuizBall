import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import Leaderboard from "./Leaderboard";
import { useEffect } from "react";

export default observer(function QuestionsDashboard(){

    const {accountStore: {accountRegistry, loadAccounts,loadingInitial, user}} = useStore();

    useEffect(() => {
        if(accountRegistry.size <= 1) 
            loadAccounts();
    }, [loadAccounts, accountRegistry.size,user?.photo,user?.gamesPlayed])

    //const {questionRegistry, loadQuestions} = questionStore;
    if (loadingInitial) return <LoadingComponent content = 'Loading Questions...' />

    return (
        <>
            <Leaderboard />
        </>
    )
})