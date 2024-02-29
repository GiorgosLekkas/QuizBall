import { Button, Grid, GridColumn, GridRow, Header, Item, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function QuestionGeographyList() {

    const [target, setTarget] = useState('');
    const {questionGeographyStore } = useStore();
    const {questions_Geography,deleteQuestion_Geography, loading} = questionGeographyStore;

    function handleQuestion_GeographyDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuestion_Geography(id);
    }

    return (
        <Segment>
            
            <Header as = 'h2'>
                <Image size = 'small'><img src = "/assets/Questions_Logo/geography.png" alt = "logo" style = {{marginRight: '10px',marginTop:'-5px'}}></img></Image>
                Geography Questions
            </Header>
            <Item.Group divided>
                {questions_Geography.map(q_geography => (
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
                                    <GridColumn><div>{q_geography.correctAnser}</div> </GridColumn>
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
                                    onClick = { () => questionGeographyStore.selectQuestion_Geography(q_geography.id)} 
                                    as = {Link} to = {`/manage/${q_geography.id}`} 
                                    floated = 'right' color = 'teal'
                                    icon = 'edit'
                                />
                                <Button
                                    //onClick = { () => questionGeographyStore.selectQuestion_Geography(q_geography.id)} 
                                    //as = {Link} to = {`/manage/${q_geography.id}`} 
                                    floated = 'right' color = 'green' textAlign = 'center'
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