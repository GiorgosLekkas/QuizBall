import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export default observer(function LoginForm() {
    const {accountStore} = useStore();
    return (
        <Formik
            initialValues={{email: "", password: ""}}
            onSubmit={values => accountStore.login(values)}    
        >
            {({handleSubmit, isSubmitting}) => (
                <Form className = 'ui form' onSubmit = {handleSubmit} autoComplete = 'off'>
                    <Header as = 'h2' content = 'Login to QuizBall' color = 'teal' textAlign = 'center' />
                    <MyTextInput placeholder = "Email" name = 'email' />
                    <MyTextInput placeholder = "Password" name = 'password' type = 'password' />
                    <Button loading = {isSubmitting} positive content = 'Login' type = 'submit' />
                </Form>
            )}
        </Formik>
    )
})