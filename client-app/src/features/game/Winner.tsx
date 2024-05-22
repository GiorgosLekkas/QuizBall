import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Button, Header, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default observer( function Winner() {

    const {gameStore: {user1, user2, score1, score2, endGame}} = useStore();

    function handleFormCancel() {
        endGame();
    }

    return (
        <>
            <Modal open
                size = "small"
                dimmer = "blurring"
            >
                <ModalHeader>
                    {score1 === score2 ? "🏅 It's a draw! 🏅" : "🎉 We have a winner! 🎉"}
                </ModalHeader>
                <ModalContent>
                    <ModalDescription>
                        {(score1 === score2) &&
                            <Header>Both played an incredible game of Quizball, showcasing your knowledge. Well done to everyone for such a thrilling game!</Header>
                        }
                        { (score1 > score2) &&
                            <Header>Congratulations to {user1} for the outstanding performance and victory in today's Quizball! Commendations to {user2} for putting up a great fight. Excellent job, everyone!</Header>
                        }
                        { (score1 < score2) &&
                            <Header>Congratulations to {user2} for the outstanding performance and victory in today's Quizball! Commendations to {user1} for putting up a great fight. Excellent job, everyone!</Header>
                        }
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button as = {Link} onClick={() => handleFormCancel} to = '/' positive content = 'OK'/>
                </ModalActions>
            </Modal>
        </>
    );
})