import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function CategorySelectionOnGoing() {
    return (
        <Segment>
            <Header icon textAlign="center">
                <Icon name = 'ban' />
                    Oops - there is a game going, you don't have access here
            </Header>
            <Segment.Inline basic justify-content= {"center"}>
                <center>
                <Button as = {Link} to = '/categories_selection' >Return to Selecting Categories</Button>
                </center>
            </Segment.Inline>
        </Segment>
    )
}