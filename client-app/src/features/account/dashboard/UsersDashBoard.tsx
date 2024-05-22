import { Grid } from "semantic-ui-react";
import UsersList from "./UsersList";

export default function UsersDashBoard() {

    //if (historyQuestionStore.loadingInitial) return <LoadingComponent content = 'Loading Activities...' />

    return (
        <Grid>
            <Grid.Column width = '15'>
                <UsersList />
            </Grid.Column>
        </Grid>
    )
}