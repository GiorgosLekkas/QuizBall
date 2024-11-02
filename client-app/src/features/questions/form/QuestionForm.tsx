import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Image, Header, Segment, Icon } from "semantic-ui-react";
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
import PhotoWidgetDropzone from "../../../app/common/imageUpload/PhotoWidgetDropzone";

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

    const [files, setFiles] = useState<any>([]);

    const [clear, setPhotoClear] = useState<Boolean>(false);

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

    const [validationSchema, setSchema] = useState<any>([]);

    useEffect(() => {
        if(origin === 'edit'){
            if(questionStore.selectedQuestion != undefined){
                let id = questionStore.selectedQuestion!.id;
                if(id && questionStore.editMode == true)
                    loadQuestion(id).then(question => setQuestion(question!))
            }
        }
    }, [loadQuestion]);

    useEffect(() => {

        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    useEffect(() => {
        if(accountStore.user?.role === 'User')
            setSchema (Yup.object( {
                question: Yup.string().required('Question is required'),
                answer1: Yup.string().required('Answer 1 is required'),
                answer2: Yup.string().required('Answer 2 is required'), 
                correctAnswer1: Yup.string().required('Correct Answer is required'),
                level: Yup.string().required('Level is required'),
            }))
        else if (questionStore.category === 'Top5')
            setSchema (Yup.object( {
                question: Yup.string().required('Question is required'),
                correctAnswer1: Yup.string().required('Correct Answer 1 is required'),
                correctAnswer2: Yup.string().required('Correct Answer 2 is required'),
                correctAnswer3: Yup.string().required('Correct Answer 3 is required'),
                correctAnswer4: Yup.string().required('Correct Answer 4 is required'),
                correctAnswer5: Yup.string().required('Correct Answer 5 is required'),
                level: Yup.string().required('Level is required')
            }))
        else if(accountStore.user?.role === 'Admin')
            setSchema (Yup.object( {
                question: Yup.string().required('Question is required'),
                answer1: Yup.string().required('Answer 1 is required'),
                answer2: Yup.string().required('Answer 2 is required'), 
                correctAnswer1: Yup.string().required('Correct Answer is required'),
                level: Yup.string().required('Level is required'),
                category: Yup.string().required('Category is required')
            }))
    }, [questionStore.category])

    function handleFormSubmit(question: Question) {
        if (!question.id) {
            let newQuestion = {
                ...question,
                id: uuid()
            };
            if(accountStore.user?.role === 'Admin' || accountStore.user?.role === 'Moderator')
                createQuestion(newQuestion, files).then(() => navigate(`/questions`));
            else
                createQuestion(newQuestion, files).then(() => navigate(`/`));
        } else {
            if(accountStore.user?.role === 'Admin' || accountStore.user?.role === 'Moderator')
                updateQuestion(question, files).then(() => navigate(`/questions`));
            else
                updateQuestion(question, files).then(() => navigate(`/`));
        }
        closeModal();
        closeForm();
        setFiles('');
    }

    function handleFormCancel() {
        setFiles('');
        closeForm();
        closeModal();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Segment clearing>
            <Formik validationSchema = {validationSchema} 
                    enableReinitialize initialValues = {question} onSubmit = {values => handleFormSubmit(values)} > 
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                        <Header as = 'h2' content = ' Question' color = 'teal' textAlign = 'center' />
                        {(accountStore.user!.role === 'Admin') &&
                            <>
                                <MySelectInput options = {categoryOptions} placeholder = 'Category' name = 'category' />
                            </>
                        }
                        <MyTextArea rows = {3} placeholder = 'Question' name = 'question'/>
                        {(questionStore.category !== 'Top5') &&
                            <>
                                <MyTextInput name='answer1' placeholder = 'Answer 1'  />
                                <MyTextInput placeholder = 'Answer 2' name = 'answer2'/>
                            </>
                        }
                        <MyTextInput placeholder = {questionStore.category !== 'Top5' ? 'Correct Answer' : 'Correct Answer 1'} name = 'correctAnswer1'/>
                        {
                            (accountStore.user!.role === 'Admin') &&
                            <>
                                {(questionStore.category === 'Top5') &&
                                    <>
                                        <MyTextInput placeholder = 'Correct Answer 2' name = 'correctAnswer2'/>
                                        <MyTextInput placeholder = 'Correct Answer 3' name = 'correctAnswer3'/>
                                        <MyTextInput placeholder = 'Correct Answer 4' name = 'correctAnswer4'/>
                                        <MyTextInput placeholder = 'Correct Answer 5' name = 'correctAnswer5'/>
                                    </>
                                }
                                {(questionStore.category === 'Logo Quiz'||questionStore.category === 'Guess The Score'||questionStore.category === 'Find Player By Photo'||questionStore.category === 'Manager id'||questionStore.category === 'Player id'||questionStore.category === 'Who Is Missing'||questionStore.category === 'Find The Stadium'||questionStore.category === 'Guess The Player') &&
                                    <>
                                        {questionStore.selectedQuestion && clear == false && question.photo != null ? (
                                            <>
                                                <Icon name = 'close' onClick = {() => setPhotoClear(true)} style = {{marginBottom: '1em'}} />
                                                <Image size = 'medium' src = {clear == false ? questionStore.selectedQuestion.photo?.url : ''} style = {{marginBottom: '1em'}} />
                                            </>
                                        ) : (files! && files.length === 0 ) ? (
                                            <PhotoWidgetDropzone setFiles = {setFiles} />
                                        ) : (
                                            <>
                                                <Icon name = 'close' onClick = {() => setFiles([])} style = {{marginBottom: '1em'}} />
                                                <Image size = 'medium' src = {files[0].preview} style = {{marginBottom: '1em'}} />
                                            </>
                                        )}
                                    </>
                                }
                            </>
                        }
                        <MySelectInput options = {levelOptions} placeholder = 'Level' name = 'level'/>
                        <Button 
                            disabled = {isSubmitting || !isValid || !dirty && (files! && files.length === 0)} 
                            loading = {isSubmitting} 
                            floated = 'right'
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