import { Card, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Profile } from "../../../app/models/Profile";

interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({profile}: Props) {

    return(
        <Card as={Link} to={`/profiles/${profile.userName}`}>
            <Card.Content>
                <Card.Header>{profile.userName}</Card.Header>
                <Card.Description>Bio goes here</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name = 'user' />
                20 Followers
            </Card.Content>
        </Card>
    );
})