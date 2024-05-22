import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SecoundUserSelection(){
    return (
        <Segment style = {{marginTop: '7em'}}>
            <Header icon textAlign="center">
                <Icon name = 'ban' />
                    Oops - there is a game going, you don't have access here
            </Header>
            <Segment.Inline basic justify-content= {"center"}>
                <center>
                <Button as = {Link} to = '/coinflip' >Return to CoinFlip</Button>
                </center>
            </Segment.Inline>
        </Segment>
    )
}