import { Grid } from "semantic-ui-react";
import AppUserList from "./AppUserList";
import { useStore } from "../../../app/stores/store";
import AppUserDetails from "../details/AppUserDetails";
import AppUserFrom from "../form/AppUserFrom";
import { observer } from "mobx-react-lite";

export default observer(function AppUserDashBoard() {

    const {appUserStore} = useStore();
    const {selectedAppUser, editMode} = appUserStore;

    return (
        <Grid>
            <Grid.Column width = '10'>
                <AppUserList />
            </Grid.Column>
            <Grid.Column width = '6'>
                {selectedAppUser && !editMode &&
                    <AppUserDetails />
                }{editMode &&
                    <AppUserFrom />
                } 
            </Grid.Column>
        </Grid>
    )
})