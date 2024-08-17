import { observer } from "mobx-react-lite";
import { Button, Grid, Header } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Account } from "../../../app/models/Account";
import EditForm from "../form/EditForm";
import { Link } from "react-router-dom";

export default observer(function ProfileContent() {

    const [target, setTarget] = useState('');

    const {accountStore, modalStore } = useStore();
    const {user, deleteAccount, loading} = accountStore;

    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }

    function handleAccountUpdate(account: Account) {
        modalStore.openModal(<EditForm account = {account} origin = "profile" />);
    }

    return (
            <Grid>
                <Grid.Column width = {16}>
                    <Header floated = 'left' icon = 'user' content = 'Account Details' />
                </Grid.Column>
                <Grid.Column width = {16}>
                    <div>{user?.userName}</div>
                    <div>{user?.firstName}</div>
                    <div>{user?.lastName}</div>
                    <div>{user?.email}</div>
                    <div>{user?.gender}</div>
                    <Button
                        name = {user?.id}
                        loading = {loading && target === user?.id}
                        onClick = { (e) => handleAccountDelete(e, user?.id!)}
                        disabled = {user?.role === 'Admin'}
                        floated = 'right'
                        color = 'red' 
                        icon = 'delete'
                    />
                    <Button
                        name = {user?.id}
                        onClick = { () => handleAccountUpdate(user!) }
                        as = {Link} 
                        floated = 'right' 
                        color = 'teal'
                        icon = 'edit'
                    />
                </Grid.Column>
            </Grid>
    )
})