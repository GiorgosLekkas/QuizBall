import { observer } from "mobx-react-lite";
import { Grid, GridRow, GridColumn, Segment, Button, Header } from "semantic-ui-react";
import Question_Display from "./Question_Display";
import { useStore } from "../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default observer( function Game() {

    const {questionStore} = useStore();

    const navigate = useNavigate();
    const {buttons, player1} = questionStore;

    function endGame(){
        questionStore.endGame();
        navigate('/');
    }

    useEffect(() => {
        var i = 0;
        buttons.forEach((value: boolean, key: string) => {
            if(value===false)
                i++;
        });
        if(i === 15) {
            endGame();
            navigate(`/`);
        }
    }, [])

    return(
        <>
            <Segment>
                <Header as = 'h1' content = {player1 ? "Player1" : "Player2"} color = 'black' textAlign = 'center' style = {{paddingBottom: '10px'}} />
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
                    </GridRow>
                </Grid>
                <Button onClick={ () => endGame()} content = 'End Game' />
            </Segment>
        </> 
    );
})