import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer( function CorrectAnswer() {

    const {gameStore} = useStore();

    return (
        <>
            <Modal open
                size = "mini"
                dimmer = "blurring"
            >
                <ModalHeader>
                    {"Correct Answer"}
                    <Icon name = 'check' />
                </ModalHeader>
                <ModalContent>
                    <ModalDescription>
                        {(gameStore.lastQuestion?.level === 'Easy') &&
                            "Congratulations! You won 1 point"
                        }
                        {(gameStore.lastQuestion?.level === 'Medium') &&
                            "Congratulations! You won 2 points"
                        }
                        {(gameStore.lastQuestion?.level === 'Hard') &&
                            "Congratulations! You won 3 points"
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