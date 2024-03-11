import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment, Image, Form, Modal } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useState } from "react";
import { Question_History } from "../../app/models/Question_History";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import * as Yup from 'yup';
import { HistoryQuestion } from "../../app/models/HistoryQuestion";

interface Props {
    question?: HistoryQuestion
}

export default observer(function QuestionPopUp({question}: Props) {

    const {questionHistoryStore, modalStore} = useStore();

    const {createQuestion_History, closeForm, loadingInitial} = questionHistoryStore;

    const {closeModal} = modalStore;

    const navigate = useNavigate();

    const [question_History] = useState<Question_History>({
        id: '',
        question: '',
        answer1: '',
        answer2: '',
        correctAnswer: '',
        level: '',
        confirmed: ''
    });

    const validationSchema = Yup.object({
        answer: Yup.string().required('Question is required')
    })

    function handleFormSubmit(question: Question_History) {
        createQuestion_History(question).then(() => navigate(`/game`));
        closeModal();
    }

    function handleFormCancel() {
        closeForm();
        closeModal();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Modal open
            closeIcon
            onClose={handleFormCancel}>
            <Segment className = {`segment_popup s_geography`}>
                <Header className = {`header_popup h_geography`}>
                    <Image className = {`icon_popup i_geography`} size = 'small'><img src = {`/assets/Questions_Logo/geography.png`} alt = "logo"></img></Image>
                    <span className = {`lebelq l_history`}> History </span>
                </Header>
                <Formik validationSchema = {validationSchema} enableReinitialize initialValues = {question_History} onSubmit = {values => handleFormSubmit(values)} > 
                    {({handleSubmit, isValid, isSubmitting, dirty}) => (
                        <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                            <Header as = 'h1' color = 'black' textAlign = 'center' content = {question?.question} >{question?.question}</Header>
                            <MyTextInput name='answer' placeholder = 'Answer'  />
                            <Button 
                                disabled = {isSubmitting || !isValid || !dirty } 
                                loading = {isSubmitting} floated = 'right'
                                positive type = 'submit'
                                content = 'Submit'
                            />
                            <Button onClick = {handleFormCancel} to = '/game' floated = 'right' type = 'submit' content = 'Cancel'/>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Modal>
    );
})