import { observer } from "mobx-react-lite";
import {Image, Modal} from "semantic-ui-react";

interface Props {
    image?: string
    onClose: () => void;
}

export default observer( function OpenImage({image, onClose}:Props) {

    return (
        <>
            <Modal open
                dimmer = "blurring"
                basic
                size = "tiny"
                onClose={onClose}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto', // Center the modal
                    width: 'auto',  // Adjust the width to auto
                    height: 'auto', // Adjust the height to auto
                }}
            >
                <Image src = {image} size = 'large' /*style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}*/ />
                
            </Modal>
        </>
    );
})