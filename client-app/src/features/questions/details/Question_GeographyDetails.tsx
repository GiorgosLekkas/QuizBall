import { Button, Card, CardContent, CardHeader, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default observer(function Question_GeographyDetails() {

    /*const {questionGeographyStore} = useStore();

    const {selectedQuestion_Geography: question, loadQuestion_Geography, loadingInitial, cancelSelectedQuestion_Geography, openForm} = questionGeographyStore;

    const {id} = useParams();

    useEffect(() => {
        if (id) 
            loadQuestion_Geography(id);
    },[id, loadQuestion_Geography])*/

    const {questionGeographyStore} = useStore();
    const {selectedQuestion_Geography: question, openForm, cancelSelectedQuestion_Geography, loadingInitial} = questionGeographyStore;

    if(loadingInitial || !question) return <LoadingComponent/>;


    return (
        <Card>
            <CardContent>
                <CardHeader>{question.question}</CardHeader>
                <Grid relaxed columns='2'>
                    <GridRow>
                        <GridColumn><div></div></GridColumn>
                        <GridColumn><div></div></GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Level:</div> </GridColumn>
                        <GridColumn><div>{question.level}</div> </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Answer 1:</div></GridColumn>
                    <GridColumn><div>{question.answer1}</div></GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Answer 2:</div></GridColumn>
                        <GridColumn><div>{question.answer2}</div></GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn><div>Correct Answer:</div> </GridColumn>
                        <GridColumn><div>{question.correctAnser}</div> </GridColumn>
                    </GridRow>
                    </Grid>
            </CardContent>
            <Card.Content extra>
                <Button.Group widths = '2'>
                    <Button 
                        onClick = { () => openForm(question.id) } 
                        basic color = 'blue' content = 'Edit' />
                    <Button 
                        onClick = {cancelSelectedQuestion_Geography} 
                        basic color = 'grey' content = 'Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})