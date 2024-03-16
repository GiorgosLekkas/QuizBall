import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import Question_HistoryListConfirmed from "../history/list/Question_HistoryListConfirmed";
import Question_GeographyListConfirmed from "../geography/list/Question_GeographyListConfirmed";
import Question_GeographyListNotConfirmed from "../geography/list/Question_GeographyListNotConfirmed";
import Question_HistoryListNotConfirmed from "../history/list/Question_HistoryListNotConfirmed";
import QuestionListConfirmed from "../list/QuestionListConfirmed";
import QuestionListNotConfirmed from "../list/QuestionListNotConfirmed";

export default observer(function QuestionsDashboard(){

    const {questionHistoryStore, questionStore} = useStore();
    const {question_HistoryRegistry, loadQuestions_History} = questionHistoryStore;

    useEffect(() => {
        if(question_HistoryRegistry.size <= 1) 
            loadQuestions_History();
    }, [loadQuestions_History, question_HistoryRegistry.size])

    const {questionGeographyStore} = useStore();
    const {question_GeographyRegistry, loadQuestions_Geography} = questionGeographyStore;

    useEffect(() => {
        if(question_GeographyRegistry.size <= 1) 
            loadQuestions_Geography();
    }, [loadQuestions_Geography, question_GeographyRegistry.size])

    const {questionRegistry, loadQuestions} = questionStore;

    useEffect(() => {
        if(questionRegistry.size <= 1) 
            loadQuestions();
    }, [loadQuestions, questionRegistry.size])


    if ( questionGeographyStore.loadingInitial) return <LoadingComponent content = 'Loading Activities...' />

    return (
        <>
            <Grid>
                <Grid.Column width = '8'>
                    <QuestionListConfirmed />
                </Grid.Column>
                <Grid.Column width = '8'>
                    <QuestionListNotConfirmed />
                </Grid.Column>
            </Grid>
        </>
    )
})