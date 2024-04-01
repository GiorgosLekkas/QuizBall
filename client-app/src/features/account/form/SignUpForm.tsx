import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../app/common/form/MySelectInput";
import ValidationError from "../../errors/ValidationError";

export default observer(function RegsiterForm() {

    const genderOptions = [
        {text: 'Male', value: 'Male'},
        {text: 'Female', value: 'Female'},
        {text: 'Other', value: 'Other'},
    ]

    const { accountStore } = useStore();

    return (
        <Formik
        initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '', error: null }}
        onSubmit={(values, { setErrors }) =>
            accountStore.register(values).catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                firstName: Yup.string().required('First Name is required!'),
                lastName: Yup.string().required('Last Name is required!'),
                username: Yup.string().required('Username is required!'),
                email: Yup.string().required('Email is required!'),
                password: Yup.string().required('Password is required!'),
                gender: Yup.string().required('Gender is required!')
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to QuizBall' color="teal" textAlign="center" />
                    <MyTextInput placeholder="First Name" name='firstName' />
                    <MyTextInput placeholder="Last Name" name='lastName' />
                    <MyTextInput placeholder="Username" name='username' />
                    <MySelectInput placeholder="Gender" name='gender' options={genderOptions} />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} 
                        positive content='Register' 
                        type="submit"  
                    />
                    <ErrorMessage name='error' render={() => 
                        <ValidationError errors={errors.error as unknown as string[]} />} />
                </Form>
            )}
        </Formik>
    )
})