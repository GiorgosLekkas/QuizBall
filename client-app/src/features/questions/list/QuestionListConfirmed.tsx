import { Button, Grid, GridColumn, GridRow, Header, Item, Segment, Image } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import QuestionForm from "../form/QuestionForm";

export default observer(function QuestionListConfirmed() { 

    const [target, setTarget] = useState('');
    const {questionStore, modalStore } = useStore();
    const {deleteQuestion, openForm, loading, questionsConfirmedByCategory} = questionStore;

    function handleQuestionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuestion(id);
    }

    function handleQuestionUpdate(id: string) {
        questionStore.selectQuestion(id);
        openForm(id);
        modalStore.openModal(<QuestionForm origin={"edit"} />)
    }

    return (
        <Segment>
            <Header as = 'h2'>
                Questions
            </Header>
            {questionsConfirmedByCategory.map(q => (
                <>
                    <Header as = 'h2'>
                        <Image size = 'huge'><img src = {`/assets/Questions_Logo/${q.category}.png`} alt = "logo" style = {{marginRight: '10px',marginTop:'-5px'}}></img></Image>
                        {q.category}
                    </Header>
                    <Item.Group divided>
                        {<Item key = {q.id} >
                            <Item.Content>
                                <Item.Header as = 'a'>{q.question}</Item.Header>
                                <Grid relaxed columns='2'>
                                    <GridRow>
                                        <GridColumn><div></div></GridColumn>
                                        <GridColumn><div></div></GridColumn>
                                    </GridRow>
                                    <GridRow>
                                        <GridColumn><div>Level:</div> </GridColumn>
                                        <GridColumn><div>{q.level}</div> </GridColumn>
                                    </GridRow>
                                    {((q.category !== 'Top5') &&
                                        <>  
                                            <GridRow>
                                                <GridColumn><div>Answer 1:</div></GridColumn>
                                                <GridColumn><div>{q.answer1}</div></GridColumn>
                                            </GridRow>
                                            <GridRow>
                                                <GridColumn><div>Answer 2:</div></GridColumn>
                                                <GridColumn><div>{q.answer2}</div></GridColumn>
                                            </GridRow>
                                            <GridRow>
                                                <GridColumn><div>Correct Answer:</div> </GridColumn>
                                                <GridColumn><div>{q.correctAnswer1}</div> </GridColumn>
                                            </GridRow>
                                        </>
                                    )} 
                                    {(q.category === 'Top5') &&
                                        <>
                                            <GridRow>
                                                <GridColumn><div>Correct Answer1:</div> </GridColumn>
                                                <GridColumn><div>{q.correctAnswer1}</div> </GridColumn>
                                            </GridRow>
                                            <GridRow>
                                                <GridColumn><div>Correct Answer2:</div> </GridColumn>
                                                <GridColumn><div>{q.correctAnswer2}</div> </GridColumn>
                                            </GridRow>
                                            <GridRow>
                                                <GridColumn><div>Correct Answer3:</div> </GridColumn>
                                                <GridColumn><div>{q.correctAnswer3}</div> </GridColumn>
                                            </GridRow>
                                            <GridRow>
                                                <GridColumn><div>Correct Answer4:</div> </GridColumn>
                                                <GridColumn><div>{q.correctAnswer4}</div> </GridColumn>
                                            </GridRow>
                                            <GridRow>
                                                <GridColumn><div>Correct Answe5:</div> </GridColumn>
                                                <GridColumn><div>{q.correctAnswer5}</div> </GridColumn>
                                            </GridRow>
                                        </>
                                    }
                                    <GridRow>
                                        <GridColumn><div>Author:</div> </GridColumn>
                                        <GridColumn><div>{q.authorName}</div> </GridColumn>
                                    </GridRow>
                                </Grid>
                                <Item.Extra>
                                    <Button
                                        name = {q.id}
                                        loading = {loading && target === q.id}
                                        onClick = { (e) => handleQuestionDelete(e, q.id)}
                                        floated = 'right'
                                        color = 'red' 
                                        icon = 'delete'
                                    />
                                    <Button
                                        name = {q.id}
                                        onClick = { () => handleQuestionUpdate(q.id) } 
                                        as = {Link} 
                                        to = {`/questions`} 
                                        floated = 'right' 
                                        color = 'teal'
                                        icon = 'edit'
                                    />
                                </Item.Extra>
                            </Item.Content>
                        </Item>}
                    </Item.Group>
                </>
            ))}
        </Segment>
    )
})