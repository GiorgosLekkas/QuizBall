import { Grid, Label } from "semantic-ui-react";
import UsersList from "./UsersList";

export default function UsersDashBoard() {

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