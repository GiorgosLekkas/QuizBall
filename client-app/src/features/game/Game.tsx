import { observer } from "mobx-react-lite";
import { Grid, GridRow, GridColumn, Segment } from "semantic-ui-react";
import Question_Display from "./Question_Display";

export default observer( function Game() {

    return(
        <Segment>
            <Grid columns='three' width = "5">
                <GridRow>
                    <GridColumn>
                        <Question_Display category = {"Geography"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"History"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Fans Question"}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Question_Display category = {"Find Player By Photo"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Find The Stadium"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Logo Quiz"}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Question_Display category = {"Who Is Missing"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Top5"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Player id"}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Question_Display category = {"Gossip"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Higher Lower"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Manager id"}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Question_Display category = {"Guess The Player"}/>
                    </GridColumn>
                    <GridColumn>
                        <Question_Display category = {"Guess The Score"}/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Segment>
    );
})