import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign = 'center' vertical className = 'masthead' > 
            <Container text >
                <Header as = 'h1' inverted >
                    <Image size = 'massive' src = './assets/logo.png' alt = 'logo' style = {{marginBottom: 12}} />    
                        QuizBall
                </Header>
                <Header as = 'h2' inverted content = 'Welcome to QuizBall' />
                <Button as = {Link} to = '/historyquestions' size = 'huge' >Go to QuizBall</Button>
                <Button as = {Link} to = '/signup' size = 'huge' >Sign Up</Button>
            </Container>
        </Segment>
    )
}