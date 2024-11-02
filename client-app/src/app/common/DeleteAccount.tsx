import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import {Button, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";
import { useStore } from "../stores/store";
import {useNavigate } from "react-router-dom";

export default observer( function OpenImage() {

    const [target, setTarget] = useState('');
    const navigate = useNavigate();

    const {accountStore} = useStore();
    const {user, deleteAccount, loading} = accountStore;

    function handleAccountDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAccount(id);
    }

    return (
        <>
            <Modal open
                dimmer = "blurring"
                size = "tiny"
                style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    width: 'auto',
                    height: 'auto'
                }}
            >
                <ModalHeader>Delete Your Account</ModalHeader>
                <ModalContent>
                    <p>Are you sure you want to delete your account</p>
                </ModalContent>
                <ModalActions>
                    <Button
                        name = {user?.id}
                        content = "Yes"
                        loading = {loading && target === user?.id}
                        onClick = { (e) => handleAccountDelete(e, user?.id!)}
                        disabled = {user?.role === 'Admin'}
                        color = 'green' 
                    />
                    <Button negative onClick = {() => navigate(`/profile/${user?.userName}`)} content = "No" /> 
                </ModalActions>
            </Modal>
        </>
    );
})