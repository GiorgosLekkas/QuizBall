import { Button, Item, Segment } from "semantic-ui-react";
import { AppUser } from "../../../app/models/AppUser";

interface Props {
    appUsers: AppUser[];
}

export default function AppUserList({appUsers}: Props){
    return (
        <Segment>
            <Item.Group divided>
                {appUsers.map(appUser => (
                    <Item  key = {appUser.id} >
                        <Item.Content>
                            <Item.Header as = 'a'>{appUser.userName}</Item.Header>
                            <Item.Meta>{appUser.birthDate}</Item.Meta>
                            <Item.Description>
                                <div>{appUser.firstName}</div>
                                <div>{appUser.userName}</div>
                                <div>{appUser.email}</div>
                                <div>{appUser.gender}</div>
                                <div>{appUser.role}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated = "right" content = 'View' color = "teal"/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}