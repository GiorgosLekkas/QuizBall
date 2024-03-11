import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { useStore } from "../../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../../app/common/form/MySelectInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question_History } from "../../../../app/models/Question_History";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';

interface Props {
    origin?: string
}

export default observer(function Question_HistoryForm({origin}:Props) {

    const levelOptions = [
        {text: 'Easy', value: 'Easy'},
        {text: 'Medium', value: 'Medium'},
        {text: 'Hard', value: 'Hard'},
    ]

    const {questionHistoryStore, modalStore} = useStore();

    const {createQuestion_History, updateQuestion_History, loadQuestion_History, closeForm, loadingInitial} = questionHistoryStore;

    const {closeModal} = modalStore;

    const navigate = useNavigate();

    const [question_History, setQuestion] = useState<Question_History>({
        id: '',
        question: '',
        answer1: '',
        answer2: '',
        correctAnswer: '',
        level: '',
        confirmed: ''
    });

    const validationSchema = Yup.object({
        question: Yup.string().required('Question is required'),
        answer1: Yup.string().required('Answer 1 is required'),
        answer2: Yup.string().required('Answer 2 is required'), 
        correctAnswer: Yup.string().required('Correct Answer is required'),
        level: Yup.string().required('Level is required'),
    })

    useEffect(() => {
        if(origin === "edit")
            if (questionHistoryStore.selectedQuestion_History != undefined){
                let id = questionHistoryStore.selectedQuestion_History!.id;
                if(id && questionHistoryStore.editMode == true)
                    loadQuestion_History(id).then(question_History => setQuestion(question_History!))
            }
    }, [loadQuestion_History]);

    function handleFormSubmit(question: Question_History) {
        if (!question_History.id) {
            let newQuestion_History = {
                ...question,
                id: uuid()
            };
            createQuestion_History(newQuestion_History).then(() => navigate(`/questions`));
        } else {
            updateQuestion_History(question).then(() => navigate(`/questions`));
        }
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
                        <Header as = 'h2' content = 'History Question' color = 'teal' textAlign = 'center' />
                        <MyTextArea rows = {3} placeholder = 'Question' name = 'question'/>
                        <MyTextInput name='answer1' placeholder = 'Answer 1'  />
                        <MyTextInput placeholder = 'Answer 2' name = 'answer2'/>
                        <MyTextInput placeholder = 'Correct Answer' name = 'correctAnswer'/>
                        <MySelectInput options = {levelOptions} placeholder = 'Level' name = 'level'/>
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