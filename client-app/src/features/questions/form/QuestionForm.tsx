import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {v4 as uuid} from 'uuid';
import { Question } from "../../../app/models/Question";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";

interface Props {
    origin?: string
}

export default observer(function QuestionForm({origin}:Props) {

    const levelOptions = [
        {text: 'Hard', value: 'Hard'},
        {text: 'Medium', value: 'Medium'},
        {text: 'Easy', value: 'Easy'}
    ]

    const categoryOptions = [
        {text: 'Fans Question', value: 'Fans Question'},
        {text: 'Find Player By Photo', value: 'Find Player By Photo'},
        {text: 'Find The Stadium', value: 'Find The Stadium'},
        {text: 'Geography', value: 'Geography'},
        {text: 'Gossip', value: 'Gossip'},
        {text: 'Guess The Player', value: 'Guess The Player'},
        {text: 'Guess The Score', value: 'Guess The Score'},
        {text: 'Higher Lower', value: 'Higher Lower'},
        {text: 'History', value: 'History'},
        {text: 'Logo Quiz', value: 'Logo Quiz'},
        {text: 'Manager id', value: 'Manager id'},
        {text: 'Player id', value: 'Player id'},
        {text: 'Top5', value: 'Top5'},
        {text: 'Who Is Missing', value: 'Who Is Missing'}
    ]

    const {questionStore, modalStore, accountStore} = useStore();

    const {createQuestion, updateQuestion, loadQuestion, closeForm, loadingInitial} = questionStore;

    const {closeModal} = modalStore;

    const navigate = useNavigate();

    const [question, setQuestion] = useState<Question>({
        id: '',
        question: '',
        answer1: '',
        answer2: '',
        correctAnswer1: '',
        correctAnswer2: '',
        correctAnswer3: '',
        correctAnswer4: '',
        correctAnswer5: '',
        level: '',
        confirmed: '',
        category: '',
    });

    const validationSchemaAdmin = Yup.object({
        question: Yup.string().required('Question is required'),
        answer1: Yup.string().required('Answer 1 is required'),
        answer2: Yup.string().required('Answer 2 is required'), 
        correctAnswer1: Yup.string().required('Correct Answer is required'),
        level: Yup.string().required('Level is required'),
        category: Yup.string().required('Level is required')
    })

    const validationSchemaUser = Yup.object({
        question: Yup.string().required('Question is required'),
        answer1: Yup.string().required('Answer 1 is required'),
        answer2: Yup.string().required('Answer 2 is required'), 
        correctAnswer1: Yup.string().required('Correct Answer is required'),
        level: Yup.string().required('Level is required'),
    })

    useEffect(() => {
        if(origin === 'edit'){
            if (questionStore.selectedQuestion != undefined){
                let id = questionStore.selectedQuestion!.id;
                if(id && questionStore.editMode == true)
                    loadQuestion(id).then(question => setQuestion(question!))
            }
        }
    }, [loadQuestion]);

    function handleFormSubmit(question: Question) {
        if (!question.id) {
            let newQuestion = {
                ...question,
                id: uuid()
            };
            createQuestion(newQuestion).then(() => navigate(`/questions`));
        } else {
            updateQuestion(question).then(() => navigate(`/questions`));
        }
        closeModal();
        closeForm();
    }

    function handleFormCancel() {
        closeForm();
        closeModal();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Segment clearing>
            <Formik validationSchema = {accountStore.user!.role === 'Admin' ? validationSchemaAdmin : validationSchemaUser} enableReinitialize initialValues = {question} onSubmit = {values => handleFormSubmit(values)} > 
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                        <Header as = 'h2' content = ' Question' color = 'teal' textAlign = 'center' />
                        <MyTextArea rows = {3} placeholder = 'Question' name = 'question'/>
                        <MyTextInput name='answer1' placeholder = 'Answer 1'  />
                        <MyTextInput placeholder = 'Answer 2' name = 'answer2'/>
                        <MyTextInput placeholder = 'Correct Answer' name = 'correctAnswer1'/>
                        {
                            (accountStore.user!.role === 'Admin') &&
                            <>
                                <MyTextInput placeholder = 'Correct Answer' name = 'correctAnswer2'/>
                                <MyTextInput placeholder = 'Correct Answer' name = 'correctAnswer3'/>
                                <MyTextInput placeholder = 'Correct Answer' name = 'correctAnswer4'/>
                                <MyTextInput placeholder = 'Correct Answer' name = 'correctAnswer5'/>
                                <MySelectInput options = {levelOptions} placeholder = 'Level' name = 'level'/>
                                <MySelectInput options = {categoryOptions} placeholder = 'Category' name = 'category'/>
                            </>
                        }
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