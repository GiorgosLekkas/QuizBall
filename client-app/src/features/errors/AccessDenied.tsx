import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function AccessDenied() {
    return (
        <Segment style = {{marginTop: '7em'}}>
            <Header icon textAlign="center">
                <Icon name = 'ban' />
                    Oops - you dont have access here
            </Header>
            <Segment.Inline basic justify-content= {"center"}>
                <center>
                <Button as = {Link} to = '/' >Return to QuizBall</Button>
                </center>
            </Segment.Inline>
        </Segment>
    )
}