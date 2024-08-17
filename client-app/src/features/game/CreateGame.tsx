import { observer } from "mobx-react-lite";
import { Button, Header, Label, Form } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";

export default observer(function CreateGame() {

    const {accountStore} = useStore();
    
    return (
        <Formik
            initialValues={{userName: "", error: null}}
            onSubmit = {(values, {setErrors}) => accountStore.secondUser(values).catch(() => setErrors(accountStore.user?.userName === values.userName ? {error: "You can't play alone"} : {error: "This user doesn't exist"}))} 
        >
            {({handleSubmit, isSubmitting, dirty, errors}) => (
                <Form className = 'ui form' onSubmit = {handleSubmit} autoComplete = 'off'>
                    <Header as = 'h2' content = 'Create New Game' textAlign = 'center' />
                    <MyTextInput placeholder = "User Name" name = 'userName' />
                    <Button 
                        onClick = {() => handleSubmit()} 
                        loading = {isSubmitting} 
                        positive content = 'Start game' 
                        type = 'submit' 
                        disabled = {isSubmitting || !dirty} 
                    />
                    <ErrorMessage name = 'error' render = {() => 
                        <Label className="error_mes" style = {{marginBottom: 10}} basic color = 'red' content = {errors.error} /> 
                    }/>
                </Form>
            )}
        </Formik>
    )
})