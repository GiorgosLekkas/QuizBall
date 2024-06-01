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
                        {(lastQuestion) && (lastQuestion.category != 'Top5') &&
                            "The correct answer is " + lastQuestion.correctAnswer1 
                        }
                        {(lastQuestion) && (lastQuestion.category === 'Top5') &&
                            "The correct answers are " + lastQuestion.correctAnswer1 + ", "
                            + lastQuestion.correctAnswer2 + ", "
                            + lastQuestion.correctAnswer3 + ", "
                            + lastQuestion.correctAnswer4 + ", "
                            + lastQuestion.correctAnswer5
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