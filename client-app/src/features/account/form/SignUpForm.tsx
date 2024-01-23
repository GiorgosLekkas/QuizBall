import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../app/common/form/MySelectInput";

export default observer(function RegsiterForm() {

    const genderOptions = [
        {text: 'Male', value: 'male'},
        {text: 'Female', value: 'female'},
        {text: 'Other', value: 'other'},
    ]

    const { accountStore } = useStore();

    return (
        <Formik
            initialValues={{ email:'', userName:'', password:'', firstName:'', lastName:'', gender:'', role:'User'}}
            onSubmit={(values) =>
            accountStore.register(values)}
            validationSchema={Yup.object({
                firstName: Yup.string().required('First Name is required!'),
                lastName: Yup.string().required('Last Name is required!'),
                username: Yup.string().required('Username is required!'),
                email: Yup.string().required('Email is required!'),
                password: Yup.string().required('Password is required!'),
                gender: Yup.string().required('Gender is required!'),
            })}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color="teal" textAlign="center" />
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
                </Form>
            )}
        </Formik>
    )
})