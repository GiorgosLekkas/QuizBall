import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { ChangeEvent, useState } from "react";

export default observer(function HistoryQuestionForm() {

    const {historyQuestionStore} = useStore();

    const {selectedHistoryQuestion, closeForm, createHistoryQuestion, updateHistoryQuestion, loading} = historyQuestionStore;

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
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setHistoryQuestion({...historyQuestion, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit = {handleSubmit} autoComplete = 'off'>
                <Form.Input placeholder = 'Question' value = {historyQuestion.question} name = 'question' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Answer1' value = {historyQuestion.answer1}  name = 'answer1' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Answer1' value = {historyQuestion.answer2} name = 'answer2' onChange = {handleInputChange} />
                <Form.Input placeholder = 'CorrectAnswer' value = {historyQuestion.correctAnser}  name = 'correctAnser' onChange = {handleInputChange} />
                <Form.Input placeholder = 'Level' value = {historyQuestion.level}  name = 'level' onChange = {handleInputChange} />
                <Button loading = {loading} floated = 'right' positive type = 'submit' content = 'submit'/>
                <Button onClick = {closeForm} floated = 'right' type = 'submit' content = 'cancel'/>
            </Form>
        </Segment>
    )
})