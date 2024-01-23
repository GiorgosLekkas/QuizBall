import { Button, Grid, GridColumn, GridRow, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default function UsersList () {

    const {accountStore} = useStore();
    const {accounts} = accountStore;

    return (
        <Segment>
            <Header as = 'h2'>Users</Header>
            <Item.Group divided>
                {accounts.map(account => (
                    <Item>
                        <Item.Content>
                            <Item.Header as = 'a'>{account.userName}</Item.Header>
                            <Grid relaxed columns='2'>
                                <GridRow>
                                    <GridColumn><div></div></GridColumn>
                                    <GridColumn><div></div></GridColumn>
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Level:</div> </GridColumn>

                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 1:</div></GridColumn>
                                    
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Answer 2:</div></GridColumn>
                                    
                                </GridRow>
                                <GridRow>
                                    <GridColumn><div>Correct Answer:</div> </GridColumn>
                                    
                                </GridRow>
                            </Grid>
                            <Item.Extra>
                                <Button 
                                    //onClick = { () => historyQuestionStore.selectHistoryQuestion(hquestion.id)} 
                                    floated = 'right' content = 'View' color = 'teal' />
                                <Button
                                    //name = {hquestion.id}
                                    //loading = {loading && target === hquestion.id}
                                    //onClick = { (e) => handleActivityDelete(e, hquestion.id)}
                                    floated = 'right'
                                    content = 'Delete'
                                    color = 'red' 
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}