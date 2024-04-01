import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";
import { Profile } from "../../../app/models/Profile";
import ProfileDetails from "./ProfileDetails";
import ProfileQuestions from "./ProfileQuestions";

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const panes = [
        {menuItem: 'About', render: () => <ProfileDetails profile = {profile} />},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile = {profile} />},
        {menuItem: 'Questions', render: () => <ProfileQuestions />},
        {menuItem: 'LeaderBoard', render: () => <Tab.Pane>LeaderBoard</Tab.Pane>},
    ];

    return (
        <Tab 
            menu = {{fluid: true, vertical: true}}
            menuPosition = 'right'
            panes = {panes}
        />
    )
})