import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question_Geography } from "../../../app/models/Question_Geography";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';

export default observer(function Question_GeographyForm() {

    const levelOptions = [
        {text: 'Easy', value: 'Easy'},
        {text: 'Medium', value: 'Medium'},
        {text: 'Hard', value: 'Hard'},
    ]

    const {questionGeographyStore} = useStore();

    const {createQuestion_Geography, updateQuestion_Geography, loadQuestion_Geography, loadingInitial} = questionGeographyStore;

    const {id} = useParams();

    const navigate = useNavigate();

    const [question_Geography, setQuestion] = useState<Question_Geography>({
        id: '',
        question: '',
        answer1: '',
        answer2: '',
        correctAnser: '',
        level: '',
    });

    const validationSchema = Yup.object({
        question: Yup.string().required('Question is required'),
        answer1: Yup.string().required('Answer 1 is required'),
        answer2: Yup.string().required('Answer 2 is required'), 
        correctAnser: Yup.string().required('Correct Answer is required'),
        level: Yup.string().required('Level is required'),
    })

    useEffect(() => {
        if (id)
            loadQuestion_Geography(id).then(question_Geography => setQuestion(question_Geography!))
    }, [id, loadQuestion_Geography]);

    function handleFormSubmit(question: Question_Geography) {
        if (!question_Geography.id) {
            let newQuestion_Geography = {
                ...question,
                id: uuid()
            };
            createQuestion_Geography(newQuestion_Geography).then(() => navigate(`/historyquestions`));
            
        } else {
            updateQuestion_Geography(question).then(() => navigate(`/historyquestions`));
        }
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Segment clearing>
            <Formik validationSchema = {validationSchema} enableReinitialize initialValues = {question_Geography} onSubmit = {values => handleFormSubmit(values)} >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                        <Header as = 'h2' content = 'Geography Question' color = 'teal' textAlign = 'center' />
                        <MyTextArea rows = {3} placeholder = 'Question' name = 'question'/>
                        <MyTextInput name='answer1' placeholder = 'Answer 1'  />
                        <MyTextInput placeholder = 'Answer 2' name = 'answer2'/>
                        <MyTextInput placeholder = 'Correct Answer' name = 'correctAnser'/>
                        <MySelectInput options = {levelOptions} placeholder = 'Level' name = 'level'/>
                        <Button 
                            disabled = {isSubmitting || !isValid || !dirty } 
                            loading = {isSubmitting} floated = 'right'
                            positive type = 'submit'
                            content = 'Submit'
                        />
                        <Button as = {Link} to = '/historyquestions' floated = 'right' type = 'submit' content = 'Cancel'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})