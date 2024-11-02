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
                        <p>Congratulations! You won {gameStore.last_points} point</p>
                        {(gameStore.lastQuestion) && (gameStore.lastQuestion.category != 'Top5') &&
                            "The answer is " + gameStore.lastQuestion.correctAnswer1 
                        }
                        {(gameStore.lastQuestion) && (gameStore.lastQuestion.category === 'Top5') &&
                            "The answers are " + gameStore.lastQuestion.correctAnswer1 + ", "
                            + gameStore.lastQuestion.correctAnswer2 + ", "
                            + gameStore.lastQuestion.correctAnswer3 + ", "
                            + gameStore.lastQuestion.correctAnswer4 + ", "
                            + gameStore.lastQuestion.correctAnswer5
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