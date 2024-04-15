import { Grid, Header, Item, Segment, Statistic } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Profile } from "../../../app/models/Profile";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
    return (
        <Segment>
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
                        <Statistic label = 'Wins' value = '0' />
                        <Statistic label = 'Draws' value = '0' />
                        <Statistic label = 'Loses' value = '0' />
                    </Statistic.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})