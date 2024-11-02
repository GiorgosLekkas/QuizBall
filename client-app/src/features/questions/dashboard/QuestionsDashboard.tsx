import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
//import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import QuestionListConfirmed from "../list/QuestionListConfirmed";
import QuestionListNotConfirmed from "../list/QuestionListNotConfirmed";

export default observer(function QuestionsDashboard(){

    const {questionStore} = useStore();

    //const {questionRegistry, loadQuestions} = questionStore;

    

    if ( questionStore.loadingInitial) return <LoadingComponent content = 'Loading Questions...' />

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