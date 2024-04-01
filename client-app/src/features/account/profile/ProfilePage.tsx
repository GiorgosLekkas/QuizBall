import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default observer(function ProfilePage() {
    const {userName} = useParams();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile} = profileStore;

    useEffect(() => {
        if (userName)
            loadProfile(userName);
        else
            console.log(userName);
    }, [loadProfile, userName])

    if (loadingProfile) return <LoadingComponent inverted content='Loading profile...' />

    if (!profile) return <h2>Problem loading profile</h2>
    
    return (
        <Grid>
            <Grid.Column width='16'>
                <ProfileHeader profile = {profile} />
                <ProfileContent profile = {profile} />
            </Grid.Column>
        </Grid>
    )
})