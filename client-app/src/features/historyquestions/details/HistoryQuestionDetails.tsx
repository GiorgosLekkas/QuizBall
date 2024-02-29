import { Button, Card, CardContent, CardHeader, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function AppUserDetails() {

    const {historyQuestionStore} = useStore();
    const {selectedHistoryQuestion: historyQuestion, openForm, cancelSelectedHistoryQuestion} = historyQuestionStore;

    if(!historyQuestion) return <LoadingComponent/>

    return (
        <Card>
            <CardContent>
                <CardHeader>{historyQuestion.question}</CardHeader>
                <Grid relaxed columns='2'>
                    <GridRow>
                        <GridColumn><div></div></GridColumn>
                        <GridColumn><div></div></GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Level:</div> </GridColumn>
                        <GridColumn><div>{historyQuestion.level}</div> </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Answer 1:</div></GridColumn>
                    <GridColumn><div>{historyQuestion.answer1}</div></GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Answer 2:</div></GridColumn>
                        <GridColumn><div>{historyQuestion.answer2}</div></GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Correct Answer:</div> </GridColumn>
                        <GridColumn><div>{historyQuestion.correctAnser}</div> </GridColumn>
                    </GridRow>
                    </Grid>
            </CardContent>
            <Card.Content extra>
                <Button.Group widths = '2'>
                    <Button onClick = { () => openForm(historyQuestion.id) } basic color = 'blue' content = 'Edit' />
                    <Button onClick = {cancelSelectedHistoryQuestion} basic color = 'grey' content = 'Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})