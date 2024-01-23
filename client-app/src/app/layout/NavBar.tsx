import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {

    const {accountStore: {user, logout, getRole}} = useStore();

    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item as = {Link}  to = '/' header>
                    <img src = "/assets/logo.png" alt = "logo" style = {{marginRight: '10px'}}></img>
                    QuizBall
                </Menu.Item>
                <Menu.Item as = {Link} to = '/historyquestions' name = 'History Questions' />
                {(!getRole() &&
                    <>
                        <Menu.Item as = {Link} to = '/errors' name = 'Errors' />
                        <Menu.Item as = {Link} to = '/users' name = 'Users' />
                    </>
                )}
                <Menu.Item>
                    <Button as = {Link} to = '/createQuestion' positive content = 'Create a history question' className = 'createq' />
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Image src = {'/assets/user.png'} avatar spaced = 'right' />
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