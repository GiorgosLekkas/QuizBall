import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function AppUserList(){

    const [target, setTarget] = useState('');
    const {appUserStore } = useStore();
    const {appusers,deleteAppUser, loading} = appUserStore;

    function handleAppUser(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAppUser(id);
    }

    return (
        <Segment>
            <Header as = 'h2'>Users</Header>
            <Item.Group divided>
                {appusers.map(user => (
                    <Item key = {user.id} >
                        <Item.Content>
                            <Item.Header as = 'a'>{user.userName}</Item.Header>
                            <Item.Description>
                                <div>{user.firstName}</div>
                                <div>{user.lastName}</div>
                                <div>{user.email}</div>
                                <div>{user.gender}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    onClick = { () => appUserStore.selectAppUser(user.id)} 
                                    floated = 'right' content = 'View' color = 'teal' />
                                <Button
                                    name = {user.id}
                                    loading = {loading && target === user.id}
                                    onClick = { (e) => handleAppUser(e, user.id)}
                                    floated = 'right'
                                    content = 'Delete'
                                    color = 'red' 
                                />
                                <Label basic content = {user.role} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})