import { Button, Form, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default observer(function HistoryQuestionForm() {

    const {historyQuestionStore} = useStore();

    const {selectedHistoryQuestion, closeForm, createHistoryQuestion, updateHistoryQuestion, loading} = historyQuestionStore;

    const nav = useNavigate();

    const initialState = selectedHistoryQuestion ?? {
        id: "",
        question: "",
        answer1: "",
        answer2: "",
        correctAnser: "",
        level: ""
    }

    const [historyQuestion, setHistoryQuestion] = useState(initialState);

    function handleSubmit() {
        historyQuestion.id ? updateHistoryQuestion(historyQuestion) : createHistoryQuestion(historyQuestion);
        nav("/historyquestions");
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setHistoryQuestion({...historyQuestion, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit = {handleSubmit} autoComplete = 'off'>
            <Header as = 'h2' content = 'Geography Question' color = 'teal' textAlign = 'center' />
                <label>Question</label>
                <Form.TextArea placeholder = 'Question' value = {historyQuestion.question} name = 'question' onChange = {handleInputChange} />
                <label>Answer 1</label>
                <Form.Input placeholder = 'Answer1' value = {historyQuestion.answer1}  name = 'answer1' onChange = {handleInputChange} />
                <label>Answer 2</label>
                <Form.Input placeholder = 'Answer2' value = {historyQuestion.answer2} name = 'answer2' onChange = {handleInputChange} />
                <label>Correct answer</label>
                <Form.Input placeholder = 'CorrectAnswer' value = {historyQuestion.correctAnser}  name = 'correctAnser' onChange = {handleInputChange} />
                <label>Level</label>
                <Form.Input placeholder = 'Level' value = {historyQuestion.level}  name = 'level' onChange = {handleInputChange} />
                <Button loading = {loading} floated = 'right' positive type = 'submit' content = 'Submit'/>
                <Button onClick = {closeForm} as = {Link} to = '/historyquestions' floated = 'right' type = 'submit' content = 'Cancel'/>
            </Form>
        </Segment>
    )
})