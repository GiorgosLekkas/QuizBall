import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import SignUpForm from "../account/form/SignUpForm";
import LoginForm from "../account/form/LoginForm";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {

    const {accountStore,modalStore} = useStore();

    return (
        <Segment inverted textAlign = 'center' vertical className = 'masthead' > 
            <Container text >
                <Header as = 'h1' inverted >
                    <Image size = 'massive' src = '/assets/logo.png' alt = 'logo' style = {{marginBottom: 12}} />
                    QuizBall
                </Header>
                {accountStore.isLoggedIn ? (
                    <>
                        <Header as = 'h2' inverted content = 'Welcome to QuizBall'></Header>
                        <Button as = {Link} to = '/game' size = 'huge' inverted >Go to QuizBall</Button>
                    </>
                ) : (
                    <>
                        <Button onClick = {() => modalStore.openModal(<LoginForm/>)} to = '/login' size = 'huge' inverted >
                            Login
                        </Button>
                        <Button onClick = {() => modalStore.openModal(<SignUpForm/>)} to = '/signup' size = 'huge' inverted >
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})