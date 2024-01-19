import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer(function AppUserDetails() {

    const {historyQuestionStore} = useStore();
    const {selectedHistoryQuestion: historyQuestion, openForm, cancelSelectedHistoryQuestion} = historyQuestionStore;

    if(!historyQuestion) return <LoadingComponent/>;

    return (
        <Card>
            <CardContent>
                <CardHeader>{historyQuestion.question}</CardHeader>
                <CardMeta>
                    <div>{historyQuestion.level}</div>
                </CardMeta>
                <CardDescription>
                    <div>{historyQuestion.answer1}</div>
                    <div>{historyQuestion.answer1}</div>
                    <div>{historyQuestion.correctAnser}</div>
                </CardDescription>
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