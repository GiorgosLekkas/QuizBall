import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function QuestionForm() {

    const levelOptions = [
        {text: 'Easy', value: 'easy'},
        {text: 'Medium', value: 'medium'},
        {text: 'Hard', value: 'hard'},
    ]

    const { historyQuestionStore } = useStore();

    return (
        <Segment>
            <Header content = 'Add a new Question' sub color = 'teal' />
            <Formik
            initialValues={{ id: '', question: '', answer1: '', answer2: '', correctAnser: '', level: ''}}
            onSubmit={(values) =>
            historyQuestionStore.createHistoryQuestion(values)}
                validationSchema={Yup.object({
                    question: Yup.string().required('Question is required!'),
                    answer1: Yup.string().required('Answer 1 is required!'),
                    answer2: Yup.string().required('Answer 2 is required!'),
                    correctAnser: Yup.string().required('Correct Answer is required!'),
                    level: Yup.string().required('Level is required!'),
                })}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                        <label>Question</label>
                        <MyTextArea rows = {3} placeholder = 'Question'name = 'question'/>
                        <label>Answer 1</label>
                        <MyTextInput placeholder="Answer 1" name='answer1' />
                        <label>Answer 2</label>
                        <MyTextInput placeholder="Answer 2" name='answer2' />
                        <label>Correct Answer</label>
                        <MyTextInput placeholder="Correct Answer" name='correctAnser' />
                        <label>Level</label>
                        <MySelectInput placeholder="Level" name='level' options={levelOptions} />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting} 
                            loading={isSubmitting} 
                            positive content='Add' 
                            type="submit"  
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})