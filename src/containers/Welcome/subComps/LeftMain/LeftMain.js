import React from 'react';

import classes from './LeftMain.css';

const LeftMain = () => {
    return (
        <div className={classes.LeftMain}>
            <div>
                <h1><u>Welcome to Quick Think!</u></h1>
                <p>The game where you have 6 seconds to think of 3 things that match the category given to you or your team. It's easy, as long as you don't panic :)</p>
            </div>

            <div>
                <h1><u>How To Play:</u></h1>
                <p>Each team will take turns answering a question</p>
                <p>Once the question is shown, the team has 6 second to give 3 answers that fulfill the question's criteria</p>
                <p>A team will recieve a point if they give 3 appropriate answers within 6 seconds</p>
                <p>The game ends after one team reaches the goal score</p>
            </div>
        </div>
    );
}

export default LeftMain;