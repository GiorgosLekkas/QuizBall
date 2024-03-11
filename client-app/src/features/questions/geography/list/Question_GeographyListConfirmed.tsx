import { Button, Grid, GridColumn, GridRow, Header, Item, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Question_GeographyForm from "../from/Question_GeographyForm";

export default observer(function Question_GeographyListConfirmed() { 

    const [target, setTarget] = useState('');
    const {questionGeographyStore, modalStore } = useStore();
    const {questions_GeographyConfirmed,deleteQuestion_Geography, openForm, loading} = questionGeographyStore;

    function handleQuestion_GeographyDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuestion_Geography(id);
    }

    function handleQuestion_GeographyUpdate(id: string) {
        questionGeographyStore.selectQuestion_Geography(id);
        openForm(id);
        modalStore.openModal(<Question_GeographyForm origin={"edit"} />)
    }

    return (
        <Segment>
            
            <Header as = 'h2'>
                <Image size = 'small'><img src = "/assets/Questions_Logo/geography.png" alt = "logo" style = {{marginRight: '10px',marginTop:'-5px'}}></img></Image>
                Geography Questions
            </Header>
            <Item.Group divided>
                {questions_GeographyConfirmed.map(q_geography => (
                    <Item key = {q_geography.id} >
                        <Item.Content>
                            <Item.Header as = 'a'>{q_geography.question}</Item.Header>
                            <Grid relaxed columns='2'>
                                <GridRow>
                                    <GridColumn><div></div></GridColumn>
                                    <GridColumn><div></div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Level:</div> </GridColumn>
                                    <GridColumn><div>{q_geography.level}</div> </GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 1:</div></GridColumn>
                                    <GridColumn><div>{q_geography.answer1}</div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 2:</div></GridColumn>
                                    <GridColumn><div>{q_geography.answer2}</div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Correct Answer:</div> </GridColumn>
                                    <GridColumn><div>{q_geography.correctAnswer}</div> </GridColumn>
                                </GridRow>
                            </Grid>
                            <Item.Extra>
                                <Button
                                    name = {q_geography.id}
                                    loading = {loading && target === q_geography.id}
                                    onClick = { (e) => handleQuestion_GeographyDelete(e, q_geography.id)}
                                    floated = 'right'
                                    color = 'red' 
                                    icon = 'delete'
                                />
                                <Button
                                    name = {q_geography.id}
                                    onClick = { () => handleQuestion_GeographyUpdate(q_geography.id) } 
                                    as = {Link} 
                                    to = {`/questions`}
                                    floated = 'right' 
                                    color = 'teal'
                                    icon = 'edit'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})