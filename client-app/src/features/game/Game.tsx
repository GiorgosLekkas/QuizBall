import { observer } from "mobx-react-lite";
import { Grid, GridRow, GridColumn, Segment } from "semantic-ui-react";
import Questions from "./Questions";

export default observer( function Game() {

    return(
        <Segment>
            <Grid columns='three' width = "5">
                <GridRow>
                    <GridColumn>
                        <Questions category = {"geography"}/>
                    </GridColumn>
                    <GridColumn>
                        <Questions category = {"history"}/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Segment>
    );
})