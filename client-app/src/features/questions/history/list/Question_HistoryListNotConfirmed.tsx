import { Button, Grid, GridColumn, GridRow, Header, Item, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Question_HistoryForm from "../from/Question_HistoryForm";

export default observer(function Question_HistoryListConfirmed() { 

    const [target, setTarget] = useState('');
    const [target1, setTarget1] = useState('');
    const {questionHistoryStore, modalStore } = useStore();
    const {questions_HistoryNotConfirmed,deleteQuestion_History, openForm, loading} = questionHistoryStore;

    function handleQuestion_HistoryDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuestion_History(id);
    }

    function handleConfirmQuestion_History(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget1(e.currentTarget.name);
        questionHistoryStore.confirmQuestion(id);
    }

    function handleQuestion_HistoryUpdate(id: string) {
        questionHistoryStore.selectQuestion_History(id);
        openForm();
        modalStore.openModal(<Question_HistoryForm origin={"edit"}/>)
    }

    return (
        <Segment>
            
            <Header as = 'h2'>
                <Image size = 'small'><img src = "/assets/Questions_Logo/history.png" alt = "logo" style = {{marginRight: '10px',marginTop:'-5px'}}></img></Image>
                History Questions
            </Header>
            <Item.Group divided>
                {questions_HistoryNotConfirmed.map(q_history => (
                    <Item key = {q_history.id} >
                        <Item.Content>
                            <Item.Header as = 'a'>{q_history.question}</Item.Header>
                            <Grid relaxed columns='2'>
                                <GridRow>
                                    <GridColumn><div></div></GridColumn>
                                    <GridColumn><div></div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Level:</div> </GridColumn>
                                    <GridColumn><div>{q_history.level}</div> </GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 1:</div></GridColumn>
                                    <GridColumn><div>{q_history.answer1}</div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 2:</div></GridColumn>
                                    <GridColumn><div>{q_history.answer2}</div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Correct Answer:</div> </GridColumn>
                                    <GridColumn><div>{q_history.correctAnswer}</div> </GridColumn>
                                </GridRow>
                            </Grid>
                            <Item.Extra>
                                <Button
                                    name = {q_history.id}
                                    loading = {loading && target === q_history.id}
                                    onClick = { (e) => handleQuestion_HistoryDelete(e, q_history.id)}
                                    floated = 'right'
                                    color = 'red' 
                                    icon = 'delete'
                                />
                                <Button
                                    name = {q_history.id}
                                    onClick = { () => handleQuestion_HistoryUpdate(q_history.id) } 
                                    as = {Link} 
                                    to = {`/questions`} 
                                    floated = 'right' 
                                    color = 'teal'
                                    icon = 'edit'
                                />
                                <Button
                                    name = {q_history.id}
                                    loading = {loading && target1 === q_history.id}
                                    onClick = { (e) => handleConfirmQuestion_History(e, q_history.id)} 
                                    floated = 'right' 
                                    color = 'green'
                                    icon = 'check'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})