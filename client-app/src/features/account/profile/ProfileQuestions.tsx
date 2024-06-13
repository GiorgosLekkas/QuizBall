import { observer } from "mobx-react-lite";
import { Grid, Header, Item, Tab, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileQuestions() {

    const {profileStore} = useStore();

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width = {16}>
                    <Header floated = 'left' icon = 'question' content = 'Submited Questions' />
                </Grid.Column>
                <Grid.Column width = {16}>
                    {profileStore.questions?.map(q => (
                        <>
                            <Header as = 'h4'>
                                <Image size = 'small'><img src = {`/assets/Questions_Logo/${q.category}.png`} alt = "logo" style = {{marginRight: '10px',marginTop:'-5px'}}></img></Image>
                                {q.category}
                            </Header>
                            <Item.Group divided>
                                <Item key = {q.id}>
                                    {(q.confirmed === 'true') ? (
                                        <Item.Content>
                                            {q.question}
                                        </Item.Content>
                                    ) : (
                                        <Item.Header as = 'h5'>
                                            {q.question}
                                        </Item.Header>
                                    )}
                                </Item>
                            </Item.Group>
                        </>
                    ))}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})