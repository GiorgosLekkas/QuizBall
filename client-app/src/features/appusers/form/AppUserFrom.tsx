import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
    return (
        <Segment clearing>
            <Form autoComplete = 'off'>
                <Form.Input placeholder = 'Username' name = 'username' />
                <Form.Input placeholder = 'First Name'  name = 'firstname' />
                <Form.Input placeholder = 'Last Name' name = 'lastname' />
                <Form.Input type = "date" placeholder = 'BirthDate'  name = 'birthdate' />
                <Form.Input placeholder = 'Email'  name = 'email' />
                <Form.Input placeholder = 'Role'  name = 'role' />
                <Button  floated = 'right' positive type = 'submit' content = 'submit'/>
                <Button  floated = 'right' type = 'submit' content = 'cancel'/>
            </Form>
        </Segment>
    )
})