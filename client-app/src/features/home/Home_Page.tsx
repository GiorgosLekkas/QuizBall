import { Link } from "react-router-dom";
import { Button, Header, Image } from "semantic-ui-react";

import { observer } from "mobx-react-lite";

export default observer(function Home_Page() {

    return (
        <div className = 'hero_container' > 
            
            <Header as = {'h1'} content = 'QuizBall' color="grey" />
            <div className="hero_buttons" >
                <Button 
                    className = "quizball" 
                    as = {Link} to = '/coinflip' 
                    content = "Go to QuizBall"
                    inverted
                    size = "huge"
                />
            </div>
        </div>
    )
})