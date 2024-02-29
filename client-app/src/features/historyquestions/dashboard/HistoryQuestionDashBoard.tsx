import { Grid } from "semantic-ui-react";
import HistoryQuestionList from "./HistoryQuestionList";
import { useStore } from "../../../app/stores/store";
import HistoryQuestionDetails from "../details/HistoryQuestionDetails";
import HistoryQuestionForm from "../from/HistoryQuestionForm";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import QuestionGeographyList from "../../questions/dashboard/QuestionGeographyList";

export default observer(function HistoryQuestionDashBoard(){

    const {historyQuestionStore} = useStore();
    const {selectedHistoryQuestion, editMode, historyQuestionRegistry, loadHistoryQuestion} = historyQuestionStore;

    useEffect(() => {
        if(historyQuestionRegistry.size <= 1) 
            loadHistoryQuestion();
    }, [loadHistoryQuestion, historyQuestionRegistry.size])

    const {questionGeographyStore} = useStore();
    const {question_GeographyRegistry, loadQuestions_Geography} = questionGeographyStore;

    useEffect(() => {
        if(question_GeographyRegistry.size <= 1) 
            loadQuestions_Geography();
    }, [loadQuestions_Geography, question_GeographyRegistry.size])


    if (historyQuestionStore.loadingInitial || questionGeographyStore.loadingInitial) return <LoadingComponent content = 'Loading Activities...' />

    return (
        <>
            <Grid>
                <Grid.Column width = '10'>
                    <HistoryQuestionList />
                </Grid.Column>
                <Grid.Column width = '6'>
                    {selectedHistoryQuestion && !editMode &&
                        <HistoryQuestionDetails />
                    }{editMode &&
                        <HistoryQuestionForm />
                    } 
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width = '10'>
                    <QuestionGeographyList />
                </Grid.Column>
            </Grid>
        </>
    )
})