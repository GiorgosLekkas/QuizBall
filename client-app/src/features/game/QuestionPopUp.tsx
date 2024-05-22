import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Image, Form, Modal, ModalHeader, ModalActions, ModalContent, ModalDescription } from "semantic-ui-react";
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
        <Formik enableReinitialize initialValues = {questionAnser} onSubmit = {values => handleFormSubmit(question, values)} > 
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Modal open
                    size = "small"
                    dimmer = "blurring"
                    className = "modal_popup"
                > 
                    <Form className = {`ui form segment_popup spop_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`} onSubmit = {handleSubmit} autoComplete = 'off' >
                        <ModalHeader className = {`header_popup hpop_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                            <Header className = "header_text" >
                                <Image className = {`icon_popup i_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`} size = 'small'><img src = {`/assets/Questions_Logo/${question?.category}.png`} alt = "logo"></img></Image>
                                <span className = {`lebelq l_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}> {question?.category} </span>
                            </Header>
                        </ModalHeader>
                        <ModalContent>
                            <ModalDescription className = "modal_description" >
                                <Header as = 'h2' color = 'black' textAlign = 'left' >{question?.question}</Header>
                                <MyTextInput name = 'answer' placeholder = 'Answer'  />
                            </ModalDescription>
                        </ModalContent>
                        <ModalActions className = "modal_actions">
                            <Button 
                                disabled = {isSubmitting || !isValid || !dirty}
                                loading = {isSubmitting} floated = 'right'
                                positive type = 'submit'
                                content = 'Submit'
                                className = "modal_buttons"
                            />
                            <Button as = {Link}  to = '/game' floated = 'right' type = 'submit' content = 'Cancel' className = "modal_buttons" />
                        </ModalActions>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
})