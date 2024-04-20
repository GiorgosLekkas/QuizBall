import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {Container, Menu, Dropdown, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import QuestionForm from "../../features/questions/form/QuestionForm";
import { useEffect } from "react";

export default observer(function NavBar() {

    const {accountStore: {user, logout, getRole}, modalStore} = useStore();
    const {questionStore} = useStore();

    const {questionRegistry, loadQuestions, isSet} = questionStore;

    useEffect(() => {
        if(questionRegistry.size <= 1) {
            loadQuestions();
        }
    }, [loadQuestions, questionRegistry.size])

    return (
        <Menu inverted fixed = 'top'>
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
                <Menu.Item as = {Link} to = '/categories_selection' name = 'Game' />
                <Menu.Item 
                    onClick = {() => modalStore.openModal(<QuestionForm origin = {"create"}/>)}
                    disabled = {isSet}
                    to = '/createQuestion'
                    positive
                    content = "Submit Question"
                />
                <Menu.Item position = 'right'>
                    <Image avatar spaced='right' src={user?.image || '/assets/user.png'} />
                    <Dropdown pointing = 'top left' text = {user?.userName} >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text = 'Logout' icon = 'power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})