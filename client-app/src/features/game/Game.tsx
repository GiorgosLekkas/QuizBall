import { observer } from "mobx-react-lite";
import { Grid, GridRow, GridColumn, Segment, Button, Header } from "semantic-ui-react";
import Question_Display from "./Question_Display";
import { useStore } from "../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ScoreBoard from "./ScoreBoard";

export default observer( function Game() {

    const {gameStore} = useStore();

    const navigate = useNavigate();
    const {buttons, player1} = gameStore;


    function endGame() {
        gameStore.endGame();
        navigate('/winner');
    }

    useEffect(() => {
        var i = 0;
        buttons.forEach((value: boolean, key: string) => {
            if(value===false)
                i++;
        });
        if(i === 15) {
            endGame();
        }
    }, [])

    return(
        <>
            <Segment style = {{marginTop: '7em'}}>
                <ScoreBoard />
                <Header as = 'h1' content = {player1 ? `${gameStore.user1}'s turn` : `${gameStore.user2}'s turn`} color = 'black' textAlign = 'center' style = {{paddingBottom: '10px'}} />
                <Grid columns='three' width = "5">
                    <GridRow>
                        <GridColumn>
                            <Question_Display category = {gameStore.categories[0]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {gameStore.categories[1]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {gameStore.categories[2]}/>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <Grid columns='three' width = "5">
                    <GridRow>
                        <GridColumn>
                            <Question_Display category = {gameStore.categories[3]}/>
                        </GridColumn>
                        <GridColumn>
                            <Question_Display category = {gameStore.categories[4]}/>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <Button onClick={ () => endGame()} content = 'End Game' />
            </Segment>
        </>
    );
})