import { observer } from "mobx-react-lite";
import { Button, Grid, Header, TabPane } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Account } from "../../../app/models/Account";
import EditForm from "../form/EditForm";
import { Link, useNavigate } from "react-router-dom";

export default observer(function ProfileContent() {

    const [target, setTarget] = useState('');

    const {accountStore, modalStore } = useStore();
    const {user, loading} = accountStore;
    const navigate = useNavigate();

    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        navigate('/delete')
    }

    function handleAccountUpdate(account: Account) {
        modalStore.openModal(<EditForm account = {account} origin = "profile" />);
    }

    return (
        <TabPane>
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
                        onClick = { (e) => handleAccountDelete(e)}
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
        </TabPane>
    )
})