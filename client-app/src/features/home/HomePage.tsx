import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import SignUpForm from "../account/form/SignUpForm";
import LoginForm from "../account/form/LoginForm";
import { observer } from "mobx-react-lite";
import NavBar from "../../app/layout/NavBar";
import CreateGame from "../game/CreateGame";

export default observer(function HomePage() {

    const {accountStore, modalStore, gameStore: {secPlayer}} = useStore();

    return (
        <>
            {accountStore.isLoggedIn &&
                <NavBar />
            }
            <Segment inverted textAlign = 'center' vertical className = 'masthead' > 
                <Container text style = {{marginTop: '300px'}} >
                    <Header as = 'h1' inverted >
                        QuizBall
                    </Header>
                    {accountStore.isLoggedIn ? (
                        <>
                            <Header as = 'h2' inverted content = 'Welcome to QuizBall'></Header>
                            <Button 
                                onClick = {() => modalStore.openModal(<CreateGame/>)} 
                                to = '/creategame' 
                                size = 'huge' 
                                inverted 
                                content = 'Create New Game' 
                                disabled = {secPlayer}
                            />
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
            <Segment inverted textAlign = 'left' vertical className = "hero_context"  >
                <Container text style = {{marginTop: '100px'}} >
                    <Header as = 'h1' inverted > QuizBall </Header>
                    <p>Welcome to QuizBall - the ultimate destination for football enthusiasts to test their knowledge and passion for the beautiful game!</p>
                    <p>Are you a die-hard football fan eager to prove your expertise? Or perhaps you're just getting started and want to learn more about the world's most popular sport? Whatever your level of football knowledge, QuizBall is here to challenge and entertain you.</p>
                    <p>Our carefully crafted quizzes cover a wide range of topics, from legendary players and historic matches to obscure trivia and current events in the football world. Whether you're a supporter of a top-tier club or a fan of the underdogs, there's something for everyone here.</p>
                    <p>Get ready to dive into the world of football trivia, compete against friends, and climb the leaderboard as you showcase your football IQ. Are you up for the challenge? Take the first step and start exploring QuizBall today!</p>
                </Container>
            </Segment>
        </>
    )
})