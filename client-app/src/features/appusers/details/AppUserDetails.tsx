import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function AppUserDetails() {

    const {appUserStore} = useStore();
    const {selectedAppUser: appUsers, openForm, cancelSelectedAppUser} = appUserStore;

    if(!appUsers) return <LoadingComponent/>;

    return (
        <Card>
            <CardContent>
                <CardHeader>{appUsers.userName}</CardHeader>
                <CardMeta>
                    <div>{appUsers.birthDate}</div>
                </CardMeta>
                <CardDescription>
                    <div>{appUsers.firstName}</div>
                    <div>{appUsers.lastName}</div>
                    <div>{appUsers.email}</div>
                    <div>{appUsers.role}</div>
                    <div>{appUsers.gender}</div>
                </CardDescription>
            </CardContent>
            <CardContent extra>
            <Button onClick = { () => openForm(appUsers.id) } basic color = 'blue' content = 'Edit' />
                    <Button onClick = {cancelSelectedAppUser} basic color = 'grey' content = 'Cancel' />
            </CardContent>
        </Card>
    )
})