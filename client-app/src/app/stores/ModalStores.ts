import { makeAutoObservable } from "mobx"
import { Modal } from "semantic-ui-react";

interface Modal {
    open: boolean,
    body: JSX.Element | null;
    size: string
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
        size: 'large'
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }

}