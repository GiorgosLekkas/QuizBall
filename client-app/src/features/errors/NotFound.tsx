import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment style = {{marginTop: '7em'}}>
            <Header icon>
                <Icon name = 'search' />
                    Oops - we've looked everywhere but could not find what you are looking for
            </Header>
            <Segment.Inline>
                <Button as = {Link} to = '/' >Return to QuizBall</Button>
            </Segment.Inline>
        </Segment>
    )
}