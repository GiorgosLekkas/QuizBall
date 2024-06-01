import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Image, Form, Modal, ModalHeader, ModalActions, ModalContent, ModalDescription, TableRow, TableCell, Table, Icon } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { AnswerQuestion, Question } from "../../app/models/Question";
import Hints from "./Hints";

export default observer(function QuestionPopUp() {

    const {questionStore, gameStore} = useStore();
    const {closeForm, loadingInitial, loadQuestion } = questionStore;

    const [loadingTop5, isLoading] = useState<boolean>(false);

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
    }, [id, loadQuestion,gameStore.fiftyfifty1,gameStore.fiftyfifty2,gameStore.top5_answers]);

    function handleFormSubmit(question: Question, questionAnser: AnswerQuestion) {
        if(question.category !== 'Top5') {
            gameStore.answering(question, questionAnser);
            closeForm();
        } else {
            isLoading(true);
            setTimeout(() => {
                gameStore.answering(question, questionAnser);
                isLoading(false);
            }, 1000);
        }
    }

    function handleFormCancel() {
        gameStore.changePlayer();
        gameStore.questionIsSelected = false;
        closeForm();
    }

    function handleStop() {
        gameStore.stopTop5();
    }

    if (loadingInitial)
        return <LoadingComponent content = "Loading Question..." />

    return (
        <Formik enableReinitialize initialValues = {questionAnser} onSubmit = {values => handleFormSubmit(question, values)} > 
            {({handleSubmit}) => (
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
                                {(gameStore.fiftyfifty1 === 'active' || gameStore.fiftyfifty2 === 'active') &&
                                    <Header 
                                        as = 'h2' 
                                        color = 'black' 
                                        textAlign = 'left' 
                                        content = {`${question?.answer1} - ${question?.answer2}`}
                                    />
                                }
                                <MyTextInput name = 'answer' placeholder = 'Answer'  />
                                {(question?.category === 'Top5') &&
                                    <Table unstackable celled>
                                        <TableRow>
                                            <TableCell width = {1} textAlign = "center">1</TableCell>
                                            <TableCell width = {5} textAlign = "center">{gameStore.top5_answers[0]}</TableCell>
                                            <TableCell width = {1} textAlign = "center"><Icon name = "check"></Icon></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width = {1} textAlign = "center">2</TableCell>
                                            <TableCell width = {5} textAlign = "center">{gameStore.top5_answers[1]}</TableCell>
                                            <TableCell width = {1} textAlign = "center"><Icon name = "check"></Icon></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width = {1} textAlign = "center">3</TableCell>
                                            <TableCell width = {5} textAlign = "center">{gameStore.top5_answers[2]}</TableCell>
                                            <TableCell width = {1} textAlign = "center"><Icon name = "check"></Icon></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width = {1} textAlign = "center">4</TableCell>
                                            <TableCell width = {5} textAlign = "center">{gameStore.top5_answers[3]}</TableCell>
                                            <TableCell width = {1} textAlign = "center"><Icon name = "check"></Icon></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width = {1} textAlign = "center">5</TableCell>
                                            <TableCell width = {5} textAlign = "center">{gameStore.top5_answers[4]}</TableCell>
                                            <TableCell width = {1} textAlign = "center"><Icon name = "check"></Icon></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell width = {1} textAlign = "center">6</TableCell>
                                            <TableCell width = {5} textAlign = "center">{gameStore.top5_answers[5]}</TableCell>
                                            <TableCell width = {1} textAlign = "center"><Icon name = "close"></Icon></TableCell>
                                        </TableRow>
                                    </Table>
                                }
                                <Hints/>
                            </ModalDescription>
                        </ModalContent>
                        <ModalActions className = "modal_actions">
                            <Button 
                                disabled = {loadingTop5}
                                loading = {loadingTop5}
                                floated = 'right'
                                positive type = 'submit'
                                content = 'Submit'
                                className = "modal_buttons"
                            />
                            <Button as = {Link}  to = '/game' onClick = {handleFormCancel} floated = 'right' type = 'submit' content = 'Cancel' className = "modal_buttons" />
                            {(gameStore.correctAnswersTop5 === 4) &&
                                <Button onClick = {handleStop} floated = 'right' type = 'submit' content = 'Stop' className = "modal_buttons" />
                            }
                        </ModalActions>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
})