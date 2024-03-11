import { Grid } from "semantic-ui-react";
import UsersList from "./UsersList";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";

export default function UsersDashBoard() {

    const {accountStore} = useStore();
    const {accountRegistry, loadAccounts} = accountStore;

    useEffect(() => {
        if(accountRegistry.size <= 1) 
            loadAccounts();
    }, [loadAccounts, accountRegistry.size])

    //if (historyQuestionStore.loadingInitial) return <LoadingComponent content = 'Loading Activities...' />

    return (
        <Grid>
            <Grid.Column width = '15'>
                <UsersList />
            </Grid.Column>
            
        </Grid>
    )
}