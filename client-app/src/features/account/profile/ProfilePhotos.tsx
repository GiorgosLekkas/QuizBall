import { observer } from "mobx-react-lite";
import { Header, Tab, Grid, Button, Card, Image } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Profile } from "../../../app/models/Profile";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props){
    const {profileStore: {isCurrentUser, uploadPhoto, uploading, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handlePhotoDelete() {
        deletePhoto();
    }

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width = {16}>
                    <Header floated = 'left' icon = 'image' content = 'Photos' />
                    <Button 
                        floated = 'right' 
                        basic content = 'Delete Photo'
                        onClick = {handlePhotoDelete}
                    />
                    {isCurrentUser && (
                        <Button 
                            floated = 'right' 
                            basic content = {addPhotoMode ? 'Cancel' : 'Add Photo'} 
                            onClick = {() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width = {16}>
                    {
                        addPhotoMode ? (
                            <PhotoUploadWidget uploadPhoto = {handlePhotoUpload} loading = {uploading} />
                        ) : (
                            <Card.Group itemsPerRow={5} >
                                <Card key={profile.photo?.id} >
                                    <Image src = {profile.photo?.url} />
                                </Card>
                            </Card.Group>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})