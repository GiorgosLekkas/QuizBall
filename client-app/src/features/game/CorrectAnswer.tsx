import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer( function CorrectAnswer() {

    const {gameStore: {lastQuestion}} = useStore();

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
                        {(lastQuestion?.level === 'Easy') &&
                            "Congratulations! You won 1 point"
                        }
                        {(lastQuestion?.level === 'Medium') &&
                            "Congratulations! You won 2 points"
                        }
                        {(lastQuestion?.level === 'Hard') &&
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