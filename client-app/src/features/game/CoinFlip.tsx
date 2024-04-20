import React, { useState } from 'react';
import { Button, Header, Image, Segment } from 'semantic-ui-react';

type CoinSide = 'heads' | 'tails';

const useCoinFlip = () => {
    const [result, setResult] = useState<CoinSide | null>(null);

    const flipCoin = () => {
        const random = Math.random();
        const side: CoinSide = random < 0.5 ? 'heads' : 'tails';
        setResult(side);
    };

    return { result, flipCoin };
};

const CoinFlip: React.FC = () => {
    const { result, flipCoin } = useCoinFlip();
    const [isFlipping, setIsFlipping] = useState<boolean>(false);

    const handleFlip = () => {
        setIsFlipping(true);
        setTimeout(() => {
            flipCoin();
            setIsFlipping(false);
        }, 1000); // Adjust this time to match your animation duration
    };

    return (
        <Segment>
            <Header content = "Coin Flip Game" as = 'h1' textAlign = 'center' />
            <Button color = 'green' onClick = {handleFlip} disabled = {isFlipping}>
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </Button>
            <div className = {`coin ${isFlipping ? 'flipping' : ''}`}>
                <div className="coin-inner">
                    {result==='heads' && (
                        <div className="coin-front">
                            <Image style = {{width: '250px', height: '250px'}} src = "/assets/heads.png" alt = "heads" />
                        </div>
                    )} { result==='tails' && (
                        <div className="coin-back">
                            <Image style = {{width: '250px', height: '250px'}} src = "/assets/tails.png" alt = "tails" />
                        </div>
                    )}
                </div>
            </div>
            {result && (
                <div>
                    <p style={{marginTop:'500px'}}>The result is: {result} </p>
                </div>
            )}
        </Segment>
    );
};

export default CoinFlip;