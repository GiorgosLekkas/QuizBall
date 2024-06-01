import { observer } from "mobx-react-lite";
import { Image, Header, ImageGroup } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer( function Hints() {

    const {gameStore} = useStore();

    function handleDouble(){
        gameStore.hintDouble();
    }

    function handleFiftyFifty(){
        gameStore.hintFiftyFifty();
    }

    function handleTelephone(){
        gameStore.hintTelephone();
    }

    return (
        <>
            <Header as = 'h5' >
                <ImageGroup size = 'tiny' align = 'left'>
                    { gameStore.player1 && 
                        <>
                            <Image 
                                src = {'/assets/Hints/50-50.png'}
                                alt = 'logo'
                                onClick = {handleFiftyFifty}
                                disabled = {gameStore.fiftyfifty1 == 'true' || gameStore.fiftyfifty1 == 'active'}
                            />
                            <Image 
                                src = {'/assets/Hints/Telephone.png'}
                                alt = 'logo'
                                style = {{marginLeft: '20px'}}
                                onClick = {handleTelephone}
                                disabled = {gameStore.telephone1}
                            />
                            <Image 
                                src = {'/assets/Hints/x2.png'}
                                alt = 'logo'
                                style = {{marginLeft: '20px'}}
                                onClick = {handleDouble}
                                disabled = {gameStore.double1 === 'true' || gameStore.double1 === 'active'}
                            />
                        </>
                    }
                    { gameStore.player2 && 
                        <>
                            <Image 
                                src = {'/assets/Hints/50-50.png'}
                                alt = 'logo'
                                onClick = {handleFiftyFifty}
                                disabled = {gameStore.fiftyfifty2 == 'true' || gameStore.fiftyfifty2 == 'active'}
                            />
                            <Image 
                                src = {'/assets/Hints/Telephone.png'}
                                alt = 'logo'
                                style = {{marginLeft: '20px'}}
                                onClick = {handleTelephone}
                                disabled = {gameStore.telephone2}
                            />
                            <Image 
                                src = {'/assets/Hints/x2.png'}
                                alt = 'logo'
                                style = {{marginLeft: '20px'}}
                                onClick = {handleDouble}
                                disabled = {gameStore.double2 === 'true' || gameStore.double2 === 'active'}
                            />
                        </>
                    }
                </ImageGroup>
            </Header>
        </>
    );
})