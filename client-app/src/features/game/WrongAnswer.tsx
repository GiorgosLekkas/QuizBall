import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer( function WrongAnswer() {

    const {gameStore: {lastQuestion}} = useStore();

    return (
        <>
            <Modal open
                size = "mini"
                dimmer = "blurring"
            >
                <ModalHeader>
                    {"Wrong Answer"}
                    <Icon name = 'close' />
                </ModalHeader>
                <ModalContent>
                    <ModalDescription>
                        {(lastQuestion) &&
                            "The correct answer is " + lastQuestion.correctAnswer1 
                        }
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button as = {Link} to = '/game' positive content = 'Continue'/>
                </ModalActions>
            </Modal>
        </>
    );
})