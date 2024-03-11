import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Menu, Dropdown, Icon } from "semantic-ui-react";
import { useStore } from "../stores/store";
import Question_HistoryForm from "../../features/questions/history/from/Question_HistoryForm";
import Question_GeographyForm from "../../features/questions/geography/from/Question_GeographyForm";
import Game from "../../features/game/Game";
import QuestionPopUp from "../../features/game/QuestionPopUp";

export default observer(function NavBar() {

    const {accountStore: {user, logout, getRole}, modalStore} = useStore();

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
                <Menu.Item as = {Link} to = '/game' name = 'Game' />
                <Menu.Item>
                    <Button as = {Link} to = '/questionpopup' positive content = 'question' />
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Icon name='question' />
                    <Dropdown pointing = 'top left' text = {"Submit Question"} >
                        <Dropdown.Menu>
                            <Dropdown.Item onClick = {() => modalStore.openModal(<Question_GeographyForm origin = {"create"}/>)} to = '/createQuestionGeography' positive content = 'Geography' className = 'createq' />
                            <Dropdown.Item onClick = {() => modalStore.openModal(<Question_HistoryForm origin={"create"}/>)} to = '/createQuestionHistory' positive content = 'History' className = 'createq' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Icon name='user' />
                    <Dropdown pointing = 'top left' text = {user?.userName} >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to = {`/account/${user?.userName}`} text = 'My Profile' icon = 'user' />
                            <Dropdown.Item onClick={logout} text = 'Logout' icon = 'power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})