import { Link } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";

export default (function NavBar() {
    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item as = {Link}  to = '/' header>
                    <img src = "/public/assets/logo.png" alt = "logo" style = {{marginRight: '10px'}}></img>
                    QuizBall
                </Menu.Item>
                <Menu.Item as = {Link} to = '/historyquestions' name = 'History Questions' />
                <Menu.Item as = {Link} to = '/appusers' name = 'AppUsers' />
                <Menu.Item>
                    <Button as = {Link} to = '/createQuestion' positive content = 'Create a history question' className = 'createq' />
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Image src = {'/assets/user.png'} avatar spaced = 'right' />
                    <Dropdown pointing = 'top left' text = "Username" >
                        <Dropdown.Menu>
                            <Dropdown.Item text = 'My Profile' icon = 'user' />
                            <Dropdown.Item text = 'Logout' icon = 'power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})