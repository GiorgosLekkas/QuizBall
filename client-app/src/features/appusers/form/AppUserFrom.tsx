import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { ChangeEvent, useState } from "react";

export default observer(function AppUserForm() {

    const {appUserStore} = useStore();

    const {selectedAppUser, closeForm, createAppUser, updateAppUser, loading} = appUserStore;

    const initialState = selectedAppUser ?? {
        id: "",
        firstName: "",
        lastName: "",
        userName: "",
        birthDate: "",
        email: "",
        password: "",
        gender: "",
        role: ""
    }

    const [user, setAppUser] = useState(initialState);

    function handleSubmit() {
        user.id ? updateAppUser(user) : createAppUser(user);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setAppUser({...user, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit = {handleSubmit} autoComplete = 'off'>
                <Form.TextArea placeholder = 'Username' value = {user.userName} name = 'userName' onChange = {handleInputChange} />
                <Form.Input placeholder = 'First Name' value = {user.firstName}  name = 'firstName' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Lst Name' value = {user.lastName} name = 'lastName' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Email' value = {user.email}  name = 'email' onChange = {handleInputChange} />
                <Form.Input type = 'date' placeholder = 'BirthDate' value = {user.birthDate}  name = 'birthDate' onChange = {handleInputChange} />
                <Form.Input type = 'password' placeholder = 'Password' value = {user.password}  name = 'password' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Gender' value = {user.gender}  name = 'gender' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Role' value = {user.role}  name = 'role' onChange = {handleInputChange} />
                <Button loading = {loading} floated = 'right' positive type = 'submit' content = 'Submit'/>
                <Button onClick = {closeForm} floated = 'right' type = 'submit' content = 'Cancel'/>
            </Form>
        </Segment>
    )
})