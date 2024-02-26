import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function UsersList () {

    const {accountStore} = useStore();
    const {Accounts} = accountStore;

    return (
        <Segment>
            <Header as = 'h2'>Users</Header>
            <Item.Group divided>
                {Accounts.map(account => (
                    <Card>
                        <CardContent>
                            <CardHeader>{account.userName}</CardHeader>
                            <CardMeta>
                                <div>{account.role}</div>
                            </CardMeta>
                            <CardDescription>
                                <div>{account.firstName}</div>
                                <div>{account.lastName}</div>
                                <div>{account.email}</div>
                                <div>{account.gender}</div>
                            </CardDescription>
                        </CardContent>
                        <CardContent extra>
                            <Button 
                                //onClick = { () => historyQuestionStore.selectHistoryQuestion(hquestion.id)} 
                                floated = 'right' content = 'View' color = 'teal' />
                            <Button
                               // name = {hquestion.id}
                               // loading = {loading && target === hquestion.id}
                                //onClick = { (e) => handleActivityDelete(e, hquestion.id)}
                                floated = 'right'
                                content = 'Delete'
                                color = 'red' 
                            />
                        </CardContent>
                    </Card>
                ))}
            </Item.Group>
        </Segment>
    )
})