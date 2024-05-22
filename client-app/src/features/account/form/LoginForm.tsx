import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export default observer(function LoginForm() {

    const {accountStore} = useStore();
    
    return (
        <Formik
            initialValues={{userName: "", password: "", error: null}}
            onSubmit = {(values, {setErrors}) => accountStore.login(values).catch(error => setErrors({error: 'Invalid username or password'}))} 
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className = 'ui form' onSubmit = {handleSubmit} autoComplete = 'off'>
                    <Header as = 'h2' content = 'Login to QuizBall' color = 'teal' textAlign = 'center' />
                    <MyTextInput placeholder = "User Name" name = 'userName' />
                    <MyTextInput placeholder = "Password" name = 'password' type = 'password' />
                    <Button loading = {isSubmitting} positive content = 'Login' type = 'submit' />
                    <ErrorMessage name = 'error' render = {() => 
                        <Label className="error_mes" style = {{marginBottom: 10}} basic color = 'red' content = {errors.error} /> 
                    }/>
                </Form>
            )}
        </Formik>
    )
})