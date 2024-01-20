import { Button, Header, Item, List, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";

export default observer(function HistoryQuestionList() {

    const [target, setTarget] = useState('');
    const {historyQuestionStore } = useStore();
    const {historyquestions,deleteHistoryQuestion, loading} = historyQuestionStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteHistoryQuestion(id);
    }

    return (
        <Segment>
            <Header as = 'h2'>History Questions</Header>
            <Item.Group divided>
                <List>
                    {historyquestions.map(hquestion => (
                        <Item key = {hquestion.id} >
                            <Item.Content>
                                <Item.Header as = 'a'>{hquestion.question}</Item.Header>
                                <Item.Description>
                                    <div>{hquestion.answer1}</div>
                                    <div>{hquestion.answer2}</div>
                                    <div>{hquestion.correctAnser}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button 
                                        onClick = { () => historyQuestionStore.selectHistoryQuestion(hquestion.id)} 
                                        floated = 'right' content = 'View' color = 'teal' />
                                    <Button
                                        name = {hquestion.id}
                                        loading = {loading && target === hquestion.id}
                                        onClick = { (e) => handleActivityDelete(e, hquestion.id)}
                                        floated = 'right'
                                        content = 'Delete'
                                        color = 'red' 
                                    />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Item.Group>
        </Segment>
    )
})