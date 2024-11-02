import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {Button, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer( function CoinFlipModal() {

    const navigate = useNavigate();
    const {accountStore, gameStore} = useStore();
    const {user, user2} = accountStore;
    const {player1} = gameStore;

    return (
        <Modal open
            dimmer = "blurring"
            size = "tiny"
        >
            <ModalHeader>CoinFlip Result</ModalHeader>
            <ModalContent>
                <p>{ (player1) ? `The result is Heads, so ${user?.userName} plays first` : `The result is Tails, so ${user2?.userName} plays first`} </p>
            </ModalContent>
            <ModalActions>
                <Button
                    content = "Continue"
                    onClick = { () => navigate('/categories_selection')}
                    color = 'green' 
                />
            </ModalActions>
        </Modal>
    );
})