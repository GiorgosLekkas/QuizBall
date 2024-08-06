import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import {Container, Menu, Dropdown, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import QuestionForm from "../../features/questions/form/QuestionForm";
import { useEffect } from "react";

export default observer(function NavBar() {

    const {accountStore: {user, logout, getRole, accountRegistry, loadAccounts}} = useStore();
    const {questionStore: {questionRegistry, loadQuestions}} = useStore();
    const {gameStore: {isSet, coinflip, secPlayer}} = useStore();
    const {modalStore} = useStore();
    const location = useLocation();

    useEffect(() => {
        if(questionRegistry.size <= 1) {
            loadQuestions();
        }
    }, [loadQuestions, questionRegistry.size])

    useEffect(() => {
        if(accountRegistry.size <= 1) 
            loadAccounts();
    }, [loadAccounts, accountRegistry.size])

    return (
        <Menu inverted fixed = 'top' className = {location.pathname === '/' ? "v2" : "v1"}>
            <Container>
                <Menu.Item as = {Link}  to = '/' header>
                    <img src = "/assets/logo.png" alt = "logo" style = {{marginRight: '10px'}}></img>
                    QuizBall
                </Menu.Item>
                {((getRole() === 'Admin' || getRole() === 'Moderator') &&
                    <>  
                        <Menu.Item as = {Link} to = '/questions' name = 'Questions' />
                    </>
                )}
                {((getRole() === 'Admin') &&
                    <>
                        <Menu.Item as = {Link} to = '/users' name = 'Users' />
                    </>
                )}
                <Menu.Item as = {Link} to = '/leaderboard' name = 'Leaderboard' />
                <Menu.Item 
                    onClick = {() => modalStore.openModal(<QuestionForm origin = {"create"}/>)}
                    disabled = {isSet || coinflip || secPlayer}
                    to = '/createQuestion'
                    positive
                    content = "Submit Question"
                />
                <Menu.Item position = 'right'>
                    <Image avatar spaced='right' src = {user?.image || '/assets/user.png'} />
                    <Dropdown pointing = 'top left' text = {user?.userName} >
                        <Dropdown.Menu>
                            <Dropdown.Item as = {Link} to = {`/profile/${user?.userName}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text = 'Logout' icon = 'power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})