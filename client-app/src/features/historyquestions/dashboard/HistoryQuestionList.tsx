import { Button, Grid, GridColumn, GridRow, Header, Item, Segment } from "semantic-ui-react";
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
            <Header as = 'h2'>Questions</Header>
            <Item.Group divided>
                {historyquestions.map(hquestion => (
                    <Item key = {hquestion.id} >
                        <Item.Content>
                            <Item.Header as = 'a'>{hquestion.question}</Item.Header>
                            <Grid relaxed columns='2'>
                                <GridRow>
                                    <GridColumn><div></div></GridColumn>
                                    <GridColumn><div></div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Level:</div> </GridColumn>
                                    <GridColumn><div>{hquestion.level}</div> </GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 1:</div></GridColumn>
                                    <GridColumn><div>{hquestion.answer1}</div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 2:</div></GridColumn>
                                    <GridColumn><div>{hquestion.answer2}</div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Correct Answer:</div> </GridColumn>
                                    <GridColumn><div>{hquestion.correctAnser}</div> </GridColumn>
                                </GridRow>
                            </Grid>
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
            </Item.Group>
        </Segment>
    )
})