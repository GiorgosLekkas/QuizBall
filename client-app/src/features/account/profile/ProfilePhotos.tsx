import { observer } from "mobx-react-lite";
import { Header, Tab, Grid, Button, Card, Image, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Profile } from "../../../app/models/Profile";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Link } from "react-router-dom";
import OpenImage from "./OpenImage";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props){
    const {profileStore: {isCurrentUser, uploadPhoto, uploading, deletePhoto, deleting}} = useStore();
    const {modalStore} = useStore();
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
                        {(profile.image !== undefined && profile.photo !== null) && 
                            <Button
                                content = 'Delete'
                                icon = 'delete'
                                floated = 'right'
                                color = 'red'
                                onClick = {handlePhotoDelete}
                                disabled = {deleting}
                                loading = {deleting}
                            />
                        }
                    
                    {isCurrentUser && (
                        <Button
                            content = {addPhotoMode ? 'Cancel' : 'Add Photo'}
                            floated = 'right'
                            disabled = {deleting}
                            color = {addPhotoMode ? 'grey' : 'teal'}
                            icon = {addPhotoMode ? 'close' : 'photo'}
                            onClick = {() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width = {16}>
                    {
                        addPhotoMode ? (
                            <PhotoUploadWidget uploadPhoto = {handlePhotoUpload} loading = {uploading} />
                        ) : (
                            <Card.Group itemsPerRow = {5} >
                                <Card key = {profile.photo?.id} >
                                    <Image 
                                        src = {profile.photo?.url}
                                        as = {Link}
                                        onClick = {() => modalStore.openModal(<Image src = {profile.photo?.url}/>)}
                                    />
                                </Card>
                            </Card.Group>
                        )
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})