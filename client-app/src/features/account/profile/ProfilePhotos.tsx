import { observer } from "mobx-react-lite";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Profile } from "../../../app/models/Profile";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props){
    const {profileStore: {isCurrentUser}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width = {16}>
                    <Header floated = 'left' icon = 'image' content = 'Photos' />
                    {isCurrentUser && (
                        <Button 
                            floated = 'right' 
                            basic content = {addPhotoMode ? 'Cancel' : 'Add Photo'} 
                            onClick = {() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width = {16}>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})