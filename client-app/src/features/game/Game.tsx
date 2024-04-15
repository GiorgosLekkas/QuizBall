import { observer } from "mobx-react-lite";
import { Grid, GridRow, GridColumn, Segment, Button } from "semantic-ui-react";
import Question_Display from "./Question_Display";
import { useStore } from "../../app/stores/store";
import { useNavigate } from "react-router-dom";

export default observer( function Game() {

    const {questionStore} = useStore();

    const navigate = useNavigate();

    function endGame(){
        questionStore.endGame();
        navigate('/');
    }

    return(
        <>
            <Segment>
                <Grid columns='three' width = "5">
                    <GridRow>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[0]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[1]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[2]}/>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <Grid columns='three' width = "5">
                    <GridRow>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[3]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[4]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[5]}/>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <Grid columns='three' width = "5">
                    <GridRow>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[6]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[7]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {questionStore.categories[8]}/>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <Button onClick={ () => endGame()} content = 'End Game' />
            </Segment>
        </> 
    );
})