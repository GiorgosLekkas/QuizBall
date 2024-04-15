import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment, Image, Form } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import * as Yup from 'yup';
import { Question } from "../../app/models/Question";

/*interface Props {
    question?: Question
}*/

export default observer(function QuestionPopUp() {

    const {questionStore, modalStore} = useStore();

    const {closeForm, loadingInitial, loadQuestion } = questionStore;

    const {closeModal} = modalStore;

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

    const validationSchema = Yup.object({
        answer: Yup.string().required('Question is required')
    })

    useEffect(() => {
        if (id)
            loadQuestion(id).then(activity => setQuestion(activity!));
    }, [id, loadQuestion]);

    function handleFormSubmit(question: Question) {
        //createQuestion(question).then(() => navigate(`/game`));
        closeModal();
    }

    function handleFormCancel() {
        closeForm();
        closeModal();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        //<Modal open
            //closeIcon
            //onClose={handleFormCancel}>
            <Segment className = {`segment_popup s_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                <Header className = {`header_popup h_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                    <Image className = {`icon_popup i_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`} size = 'small'><img src = {`/assets/Questions_Logo/${question?.category}.png`} alt = "logo"></img></Image>
                    <span className = {`lebelq l_${question?.category?.replace(" ","").replace(" ","").replace(" ","")}`}> {question?.category} </span>
                </Header>
                <Formik validationSchema = {validationSchema} enableReinitialize initialValues = {question} onSubmit = {values => handleFormSubmit(values)} > 
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
                            <Button as = {Link}  to = '/game' floated = 'right' type = 'submit' content = 'Cancel'/>
                        </Form>
                    )}
                </Formik>
            </Segment>
        //</Modal>
    );
})