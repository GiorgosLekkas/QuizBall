import { observer } from "mobx-react-lite";
import { Grid, Header, Tab } from "semantic-ui-react";

export default observer(function ProfileQuestions() {

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width = {16}>
                    <Header floated = 'left' icon = 'question' content = 'Submited Questions' />
                </Grid.Column>
                <Grid.Column width = {16}>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})