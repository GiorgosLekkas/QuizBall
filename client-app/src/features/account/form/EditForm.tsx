import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import {useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Account } from "../../../app/models/Account";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface Props {
    account: Account
    origin: string
}

export default observer(function Question_HistoryForm({account, origin}:Props) {

    const genderOptions = [
        {text: 'Male', value: 'Male'},
        {text: 'Female', value: 'Female'},
        {text: 'Other', value: 'Other'},
    ]

    const roleOptions = [
        {text: 'User', value: 'User'},
        {text: 'Moderator', value: 'Moderator'},
        {text: 'Admin', value: 'Admin'},
    ]

    const {accountStore, modalStore} = useStore();

    const {updateAccount, closeForm, loadingInitial} = accountStore;

    const {closeModal} = modalStore;

    const navigate = useNavigate();

    const [account_details] = useState<Account>({
        id: account.id,
        email: account.email,
        userName: account.userName,
        password: account.password,
        firstName: account.firstName,
        lastName: account.lastName,
        gamesPlayed: account.gamesPlayed,
        won: account.won,
        drawn: account.drawn,
        lost: account.lost,
        plus: account.plus,
        minus: account.minus,
        winrate: account.winrate,
        plus_Minus: account.plus_Minus,
        totalPoints: account.totalPoints,
        gender: account.gender,
        role: account.role,
        token: account.token,
        photo: account.photo
    });

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required'),
        userName: Yup.string().required('User name 1 is required'),
        firstName: Yup.string().required('First Name 2 is required'), 
        lastName: Yup.string().required('Last Name Answer is required'),
        gender: Yup.string().required('Gender is required'),
        role: Yup.string().required('Role is required'),
    })

    function handleFormSubmit(account: Account) {
        if(origin === "users")
            updateAccount(account).then(() => navigate(`/users`));
        else 
            updateAccount(account).then(() => navigate(`/profile/${account.userName}`));
        closeModal();
    }

    function handleFormCancel() {
        closeForm();
        closeModal();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Segment clearing>
            <Formik validationSchema = {validationSchema} enableReinitialize initialValues = {account_details} onSubmit = {values => handleFormSubmit(values)} > 
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                        <Header as = 'h2' content = 'Edit Account' color = 'teal' textAlign = 'center' />
                        <MyTextInput placeholder = 'First Name' name = 'firstName'/>
                        <MyTextInput placeholder = 'Last Name' name = 'lastName'/>
                        <MyTextInput placeholder = 'Userame' name = 'userName'/>
                        <MyTextInput placeholder = 'Email' name='email'/>
                        {((origin === 'users') &&
                            <MySelectInput options = {roleOptions} placeholder = 'Role' name = 'role'/>
                        )}
                        <MySelectInput options = {genderOptions} placeholder = 'Gender' name = 'gender'/>
                        <Button 
                            disabled = {isSubmitting || !isValid || !dirty } 
                            loading = {isSubmitting} floated = 'right'
                            positive type = 'submit'
                            content = 'Submit'
                        />
                        <Button onClick = {handleFormCancel} floated = 'right' type = 'submit' content = 'Cancel'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})