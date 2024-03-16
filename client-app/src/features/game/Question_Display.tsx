import { observer } from "mobx-react-lite";
import { Button, Item, Image, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";
import QuestionPopUp from "./QuestionPopUp";

interface Props {
    category?: string
}

export default observer(function Question_Display({category}: Props) {

    const {questionGeographyStore, modalStore } = useStore();
    const {question_GeographyEasy, question_GeographyMedium, question_GeographyHard, openForm} = questionGeographyStore;

    function handleQuestion_GeographyUpdate(id: string | undefined) {
        questionGeographyStore.selectQuestion_Geography(id!);
        openForm(id);
        modalStore.openModal(<QuestionPopUp question = {questionGeographyStore.question_GeographyRegistry.get(id!)}/>)
    }

    return (
        <>
            <Segment className = {`segmentq s_${category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                <Header className = {`headerq h_${category?.replace(" ","").replace(" ","").replace(" ","")}`} textAlign="center">
                    <label className = "q_label">{category}</label>
                </Header>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Extra>
                                <Button 
                                    size="big" 
                                    content = "x1" 
                                    className = {`buttonq b_${category?.replace(" ","").replace(" ","").replace(" ","")}`}
                                    //key = {question_GeographyEasy?.id}
                                    onClick = { () => handleQuestion_GeographyUpdate(question_GeographyEasy?.id) } 
                                    as = {Link} 
                                />
                                <Button 
                                    size="big" 
                                    content = "x2" 
                                    className = {`buttonq b_${category?.replace(" ","").replace(" ","").replace(" ","")}`}
                                    //key = {question_GeographyMedium?.id}
                                    onClick = { () => handleQuestion_GeographyUpdate(question_GeographyMedium?.id) } 
                                    as = {Link} 
                                />
                                <Button 
                                    size="big" 
                                    content = "x3" 
                                    className = {`buttonq b_${category?.replace(" ","").replace(" ","").replace(" ","")}`}
                                    key = {question_GeographyHard?.id}
                                    onClick = { () => handleQuestion_GeographyUpdate(question_GeographyHard?.id!) } 
                                    as = {Link} 
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Image className = {`iconq i_${category?.replace(" ","").replace(" ","").replace(" ","")}`}><img src = {`/assets/Questions_Logo/${category}.png`} alt = "logo"></img></Image>
        </>
    );
})