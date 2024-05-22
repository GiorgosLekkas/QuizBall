import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import EditForm from "../form/EditForm";
import { Account } from "../../../app/models/Account";

export default observer(function UsersList () {

    const [target, setTarget] = useState('');

    const {accountStore, modalStore } = useStore();
    const {Accounts, deleteAccount, loading} = accountStore;

    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }

    function handleAccountUpdate(account: Account) {
        //questionHistoryStore.selectQuestion_History(id);
        //openForm();
        modalStore.openModal(<EditForm account={account} origin="user" />);
    }

    return (
        <Segment style = {{marginTop: '7em'}} >
            <Header as = 'h1'>Users</Header>
            <Item.Group divided>
                {Accounts.map(account => (
                    <Card width = '15' key={account.id}>
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
                                name = {account.id}
                                loading = {loading && target === account.id}
                                onClick = { (e) => handleAccountDelete(e, account.id!)}
                                floated = 'right'
                                color = 'red' 
                                icon = 'delete'
                            />
                            <Button
                                name = {account.id}
                                onClick = { () => handleAccountUpdate(account) } 
                                as = {Link} 
                                to = {`/users`} 
                                floated = 'right' 
                                color = 'teal'
                                icon = 'edit'
                            />
                        </CardContent>
                    </Card>
                ))}
            </Item.Group>
        </Segment>
    )
})