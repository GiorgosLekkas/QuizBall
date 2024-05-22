import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment, Image, Form, Modal } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import * as Yup from 'yup';
import { AnswerQuestion, Question } from "../../app/models/Question";

export default observer(function QuestionPopUp() {

    const {questionStore, gameStore } = useStore();
    const {changePlayer} = gameStore;
    const {closeForm, loadingInitial, loadQuestion } = questionStore;

    const {id} = useParams();

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
        category: '',
        level: '',
        confirmed: ''
    });

    const [questionAnser] = useState<AnswerQuestion>({
        answer: ''
    });

    const validationSchema = Yup.object({
        answer: Yup.string().required('Question is required')
    })

    useEffect(() => {
        if (id)
            loadQuestion(id).then(question => setQuestion(question!));
    }, [id, loadQuestion]);

    function handleFormSubmit(question: Question, questionAnser: AnswerQuestion) {
        gameStore.answering(question, questionAnser);
        closeForm();
    }

    function handleFormCancel() {
        changePlayer();
        closeForm();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Modal 
            open
            onClose = {handleFormCancel}
            dimmer = "blurring"
        >
            <>
                <Segment style = {{marginTop: '10em'}} className = {`segment_popup s_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                    <Header className = {`header_popup h_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                        <Image className = {`icon_popup i_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`} size = 'small'><img src = {`/assets/Questions_Logo/${question?.category}.png`} alt = "logo"></img></Image>
                        <span className = {`lebelq l_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}> {question?.category} </span>
                    </Header>
                    <Formik validationSchema={validationSchema} enableReinitialize initialValues = {questionAnser} onSubmit = {values => handleFormSubmit(question, values)} > 
                        {({handleSubmit, isValid, isSubmitting, dirty}) => (
                            <Form className = "ui form" onSubmit = {handleSubmit} autoComplete = 'off'>
                                <Header as = 'h1' color = 'black' textAlign = 'center' >{question?.question}</Header>
                                <MyTextInput name = 'answer' placeholder = 'Answer'  />
                                <Button 
                                    disabled = {isSubmitting || !isValid || !dirty}
                                    loading = {isSubmitting} floated = 'right'
                                    positive type = 'submit'
                                    content = 'Submit'
                                />
                                <Button as = {Link}  to = '/game' floated = 'right' type = 'submit' content = 'Cancel'/>
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </>
        </Modal>
    );
})