import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../app/common/form/MySelectInput";
import MyDateInput from "../../app/common/form/MyDateInput";

export default observer(function RegsiterForm() {

    const genderOptions = [
        {text: 'Male', value: 'male'},
        {text: 'Female', value: 'female'},
        {text: 'Other', value: 'other'},
    ]

    const roleOptions = [
        {text: 'User', value: 'user'},
        {text: 'Moderator', value: 'moderator'},
        {text: 'Admin', value: 'admin'},
    ]

    const { appUserStore } = useStore();

    return (
        <Formik
            initialValues={{ firstName: '',lastName: '', username: '', email: '', password: '', gender: null, role:null, error: null }}
            onSubmit={(values, { setErrors }) =>
            appUserStore.register(values).catch((error: any) => setErrors({error}))}
            validationSchema={Yup.object({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
                gender: Yup.string().required(),
                role: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color="teal" textAlign="center" />
                    <MyTextInput placeholder="First Name" name='firstName' />
                    <MyTextInput placeholder="Last Name" name='lastName' />
                    <MyTextInput placeholder="Username" name='username' />
                    <MySelectInput placeholder="Gender" name='gender' options={genderOptions} />
                    <MyDateInput 
                            placeholderText = 'Date' 
                            name = 'date' 
                            showTimeSelect 
                            timeCaption = 'time' 
                            dateFormat = 'MMMM d, yyyy h:mm aa'
                    />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <MySelectInput placeholder="Role" name='role' options={roleOptions} />
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