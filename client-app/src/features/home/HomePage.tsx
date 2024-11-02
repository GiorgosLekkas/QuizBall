import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import SignUpForm from "../account/form/SignUpForm";
import LoginForm from "../account/form/LoginForm";
import { observer } from "mobx-react-lite";
import NavBar from "../../app/layout/NavBar";
import CreateGame from "../game/CreateGame";
import { useEffect, useState } from "react";

export default observer(function HomePage() {

    const {accountStore, modalStore, gameStore: {secPlayer}} = useStore();

    const imageClasses = ['image', 'image1', 'image2', 'image3','image4', 'image5', 'image6','image7', 'image8', 'image9', 'image10'];

    const instructions = [
        { text: 'Click on "Create New Game" to start a new game and invite your friends to play along.', imgSrc: 'assets/Instructions/Instruction1.png' },
        { text: `Before the game starts, a coin flip will decide who plays first. If it's heads, the logged-in user starts. If it's tails, the invited user starts.`, imgSrc: 'assets/Instructions/Instruction2.png' },
        { text: 'Select the categories you want to answer questions from. You can choose from a variety of categories to make the game more interesting and challenging.', imgSrc: 'assets/Instructions/Instruction3.png' },
        { text: 'Once the game starts, answer the trivia questions as quickly and accurately as possible. You will have a limited amount of time for each question.', imgSrc: 'assets/Instructions/Instruction4.png' },
        { text: 'Earn points based on the difficulty. Answering correctly an easy question you get 1 point, a medium 2 points and a hard 3 points', imgSrc: 'assets/Instructions/Instruction5.png' },
        { text: 'At the end of the game, the player with the most points wins and gets 3 points. If there is a draw both of them get 1 point.', imgSrc: 'assets/Instructions/Instruction6.png' },
      ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageClasses.length);
        }, 8000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {accountStore.isLoggedIn &&
                <NavBar />
            }
            <Segment
                inverted
                textAlign = 'center'
                vertical
                className = 'masthead'
                style = {{
                    display: 'inherit',
                    alignItems: 'center',
                    boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.85)',
                    height: '100vh',
                    transition: 'background-image 2s linear',
                    backgroundImage: `url('assets/Homepage/${imageClasses[currentIndex]}.png')`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
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
                <div className = "instructions" >                    
                    <Header as = 'h1' inverted > QuizBall </Header>
                    <p>Welcome to QuizBall - the ultimate destination for football enthusiasts to test their knowledge and passion for the beautiful game!</p>
                    <p></p>
                    <p>Are you a die-hard football fan eager to prove your expertise? Or perhaps you're just getting started and want to learn more about the world's most popular sport? Whatever your level of football knowledge, QuizBall is here to challenge and entertain you.</p>
                    <p></p>
                    <p>Our carefully crafted quizzes cover a wide range of topics, from legendary players and historic matches to obscure trivia and current events in the football world. Whether you're a supporter of a top-tier club or a fan of the underdogs, there's something for everyone here.</p>
                    <p></p>
                    <p>Get ready to dive into the world of football trivia, compete against friends, and climb the leaderboard as you showcase your football IQ. Are you up for the challenge? Take the first step and start exploring QuizBall today!</p>
                    
                    <h1>How to Play QuizBall</h1>
                    {instructions.map((instruction, index) => (
                        <div className = {`instruction-step ${index % 2 === 0 ? 'image-right' : 'image-left'}`} key={index}>
                            <Image src = {instruction.imgSrc} alt = {`Step ${index + 1}`}/>
                            <div className = {`text`}>
                                <h3>Step {index + 1}</h3>
                                <p>{instruction.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Segment>
        </>
    )
})