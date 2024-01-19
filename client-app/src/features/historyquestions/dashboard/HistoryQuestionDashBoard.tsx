import { Grid } from "semantic-ui-react";
import HistoryQuestionList from "./HistoryQuestionList";
import { useStore } from "../../../app/stores/store";
import HistoryQuestionDetails from "../details/HistoryQuestionDetails";
import HistoryQuestionForm from "../from/HistoryQuestionForm";
import { observer } from 'mobx-react-lite';

export default observer(function HistoryQuestionDashBoard(){

    const {historyQuestionStore} = useStore();
    const {selectedHistoryQuestion, editMode} = historyQuestionStore;

    return (
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
    )
})