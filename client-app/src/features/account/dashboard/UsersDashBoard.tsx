import { Grid, Label } from "semantic-ui-react";
import UsersList from "./UsersList";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";

export default function UsersDashBoard() {

    const {accountStore} = useStore();

    useEffect(() => {
        accountStore.loadAccounts();
    },[accountStore])

    return (
        <Grid>
            <Grid.Column width = '10'>
                <UsersList />
            </Grid.Column>
            <Grid.Column width = '6'>
                {<Label>In Progress..</Label>/*selectedHistoryQuestion && !editMode &&
                    <HistoryQuestionDetails />
                }{editMode &&
                    <HistoryQuestionForm />
                */} 
            </Grid.Column>
        </Grid>
    )
}