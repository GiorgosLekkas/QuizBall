import { observer } from "mobx-react-lite";

export default observer( function CoinFlip() {

    /*constructor(props) {
        super(props);
        this.state = {
          result: "",
          nader: "nader"
        };
        this.coinToss = coinToss.bind(this);
    }*/

    function coinToss() {
        /*setState({ nader: "" }, () => {
            if (Math.random() < 0.5) {
                setState({ result: "heads" });
                console.log("heads");
            } else {
                setState({ result: "tails" });
                console.log("tails");
            }
        });*/
    }

    return (
        <>
            <div className="App">
                <div id="coin" className={/*this.state.result*/"m"} key={+new Date()}>
                <div className="side-a">
                    <h2>TAIL</h2>
                </div>
                <div className="side-b">
                    <h2>HEAD</h2>
                </div>
                </div>
                    <h1>Flip a coin</h1>
                <button id="btn" onClick={coinToss}>
                    Coin Toss
                </button>
            </div>
        </>
    );
})