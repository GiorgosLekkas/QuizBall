import { Grid, Header, Item, Segment, Statistic } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Profile } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {

    const {accountStore: {user}} = useStore();

    return (
        <Segment style = {{marginTop: '7em'}} >
            <Grid>
                <Grid.Column width = {12}>
                    <Item.Group>
                        <Item>
                        <Item.Image avatar size = 'small' src = {profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign = 'middle'>
                                <Header as = 'h1' content = {profile.userName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Statistic.Group width = {3}>
                        <Statistic label = 'Wins' value = {user?.won} />
                        <Statistic label = 'Draws' value = {user?.drawn} />
                        <Statistic label = 'Loses' value = {user?.lost} />
                    </Statistic.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})