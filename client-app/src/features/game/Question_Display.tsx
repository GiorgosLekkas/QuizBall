import { observer } from "mobx-react-lite";
import { Button, Item, Image, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Link, useNavigate } from "react-router-dom";

interface Props {
    category?: string
}

export default observer(function Question_Display({category}: Props) {

    const {questionStore, gameStore} = useStore();
    const {openForm, allQuestionsGame} = gameStore;
    const {buttons} = gameStore;

    const navigate = useNavigate();
 
    function openQuestion(id: string, level: string) {
        questionStore.selectQuestion(id!);
        if(level === 'Easy')
            gameStore.easyButton(category + ' Easy');
        else if (level === 'Medium')
            gameStore.mediumButton(category + ' Medium');
        else if(level === 'Hard')
            gameStore.hardButton(category + ' Hard');

        if(level === 'Easy_1' && category === 'Higher Lower')
            gameStore.easyButton(category + ' Easy_1');
        else if(level === 'Easy_2' && category === 'Higher Lower') 
            gameStore.easyButton(category + ' Easy_2');
        else if(level === 'Easy_3' && category === 'Higher Lower') 
            gameStore.easyButton(category + ' Easy_3');

        if(level === 'Medium_1' && (category === 'Manager id' || category === 'Player id' || category === 'Find The Stadium' || category === 'Find Player By Photo' || category === 'Gossip' || category === 'Guess The Player'))
            gameStore.mediumButton(category + ' Medium_1');
        else if(level === 'Medium_2' && (category === 'Manager id' || category === 'Player id' || category === 'Find The Stadium' || category === 'Find Player By Photo' || category === 'Gossip' || category === 'Guess The Player'))
            gameStore.mediumButton(category + ' Medium_2');
        else if(level === 'Medium_3' && (category === 'Manager id' || category === 'Player id' || category === 'Find The Stadium' || category === 'Find Player By Photo' || category === 'Gossip' || category === 'Guess The Player'))
            gameStore.mediumButton(category + ' Medium_3');

        if(level === 'Hard_1' && (category === 'Top5' || category === 'Who Is Missing' || category === 'Guess The Score'))
            gameStore.hardButton(category + ' Hard_1');
        else if(level === 'Hard_2' && (category === 'Top5' || category === 'Who Is Missing' || category === 'Guess The Score'))
            gameStore.hardButton(category + ' Hard_2');
        else if(level === 'Hard_3' && (category === 'Top5' || category === 'Who Is Missing' || category === 'Guess The Score'))
            gameStore.hardButton(category + ' Hard_3');

        openForm(id);
        navigate(`/qpopup/${id}`)
    }

    return (
        <>
            <Segment className = {`segmentq s_${category?.replace(" ","").replace(" ","").replace(" ","")}`}>
                <Header className = {`headerq h_${category?.replace(" ","").replace(" ","").replace(" ","")}`} textAlign = "center">
                    <label className = "q_label">{category}</label>
                </Header>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Extra>
                                {allQuestionsGame.map(q => ( 
                                    <>
                                        {(q.category === category) && (q.category !== 'Higher Lower') && (q.category !== 'Top5') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Easy') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x1'}
                                                            className = {buttons.get(category + ' Easy') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Easy') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }
                                        {(q.category === category) && (q.category === 'Higher Lower') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Easy_1') && (q.category === 'Higher Lower') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x1'}
                                                            className = {buttons.get(category + ' Easy_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Easy_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Easy_2') && (q.category === 'Higher Lower') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x1'}
                                                            className = {buttons.get(category + ' Easy_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Easy_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Easy_3') && (q.category === 'Higher Lower') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x1'}
                                                            className = {buttons.get(category + ' Easy_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Easy_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }
                                        {(q.category === category) && (q.category === 'Player id') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Medium_1') && (q.category === 'Player id') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_2') && (q.category === 'Player id') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_3') && (q.category === 'Player id') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Manager id') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Medium_1') && (q.category === 'Manager id') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_2') && (q.category === 'Manager id') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_3') && (q.category === 'Manager id') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Find Player By Photo') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Medium_1') && (q.category === 'Find Player By Photo') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_2') && (q.category === 'Find Player By Photo') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_3') && (q.category === 'Find Player By Photo') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Find The Stadium') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Medium_1') && (q.category === 'Find The Stadium') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_2') && (q.category === 'Find The Stadium') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_3') && (q.category === 'Find The Stadium') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Gossip') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Medium_1') && (q.category === 'Gossip') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_2') && (q.category === 'Gossip') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_3') && (q.category === 'Gossip') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Guess The Player') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Medium_1') && (q.category === 'Guess The Player') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_2') && (q.category === 'Guess The Player') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Medium_3') && (q.category === 'Guess The Player') &&
                                                    <>
                                                        <Button 
                                                            size="big" 
                                                            content = {'x2'}
                                                            className = {buttons.get(category + ' Medium_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Medium_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Top5') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Hard_1') && (q.category === 'Top5') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard_2') && (q.category === 'Top5') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard_3') && (q.category === 'Top5') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Guess The Score') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Hard_1') && (q.category === 'Guess The Score') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard_2') && (q.category === 'Guess The Score') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard_3') && (q.category === 'Guess The Score') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }

                                        {(q.category === category) && (q.category === 'Who Is Missing') &&
                                            <>
                                                {(q.category === category) && (q.level === 'Hard_1') && (q.category === 'Who Is Missing') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_1') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_1') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard_2') && (q.category === 'Who Is Missing') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_2') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_2') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                                {(q.category === category) && (q.level === 'Hard_3') && (q.category === 'Who Is Missing') &&
                                                    <>
                                                        <Button 
                                                            size = "big" 
                                                            content = {'x3'}
                                                            className = {buttons.get(category + ' Hard_3') ? `buttonq b_${q.category?.replace(" ","").replace(" ","").replace(" ","")}` : 'buttonq disabled'}
                                                            key = {q?.id}
                                                            onClick = { () => openQuestion(q.id, 'Hard_3') }
                                                            as = {Link}
                                                        />
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                ))}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Image className = {`iconq i_${category?.replace(" ","").replace(" ","").replace(" ","")}`}><img src = {`/assets/Questions_Logo/${category}.png`} alt = "logo"></img></Image>
        </>
    );
})