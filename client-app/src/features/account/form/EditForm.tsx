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
}

export default observer(function Question_HistoryForm({account}:Props) {

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

    const [question_History] = useState<Account>({
        id: account.id,
        email: account.email,
        userName: account.userName,
        password: account.password,
        firstName: account.firstName,
        lastName: account.lastName,
        gender: account.gender,
        role: account.role,
    });

    const validationSchema = Yup.object({
        email: Yup.string().required('Question is required'),
        userName: Yup.string().required('Answer 1 is required'),
        firstName: Yup.string().required('Answer 2 is required'), 
        lastName: Yup.string().required('Correct Answer is required'),
        gender: Yup.string().required('Level is required'),
        role: Yup.string().required('Level is required'),
    })

    /*useEffect(() => {
        if(origin === "edit")
            if (questionHistoryStore.selectedQuestion_History != undefined){
                let id = questionHistoryStore.selectedQuestion_History!.id;
                if(id && questionHistoryStore.editMode == true)
                    loadQuestion_History(id).then(question_History => setQuestion(question_History!))
            }
    }, [loadQuestion_History]);*/

    function handleFormSubmit(account: Account) {
        updateAccount(account).then(() => navigate(`/users`));
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
            <Formik validationSchema = {validationSchema} enableReinitialize initialValues = {question_History} onSubmit = {values => handleFormSubmit(values)} > 
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                        <Header as = 'h2' content = 'Edit Account' color = 'teal' textAlign = 'center' />
                        <MyTextInput placeholder = 'First Name' name = 'firstName'/>
                        <MyTextInput placeholder = 'Last Name' name = 'lastName'/>
                        <MyTextInput placeholder = 'Userame' name = 'userName'/>
                        <MyTextInput placeholder = 'Email'   name='email'/>
                        <MySelectInput options = {genderOptions} placeholder = 'Gender' name = 'gender'/>
                        <MySelectInput options = {roleOptions} placeholder = 'Role' name = 'role'/>
                        <Button 
                            disabled = {isSubmitting || !isValid || !dirty } 
                            loading = {isSubmitting} floated = 'right'
                            positive type = 'submit'
                            content = 'Submit'
                        />
                        <Button onClick = {handleFormCancel} to = '/questions' floated = 'right' type = 'submit' content = 'Cancel'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})