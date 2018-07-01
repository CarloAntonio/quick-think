import React from 'react';
import CountdownClock from 'react-countdown-clock';

import classes from './LeftMain.css';
import Aux from '../../../../hoc/Aux';

const LeftMain = (props) => {
    return (
        <Aux>
            <h1 className={classes.questionPrompt}>Question:</h1>
            <br/>
            <p className={classes.questionGenerated}>{props.questions[props.questionNumber].question}</p>
            <br/>
            <p className={classes.questionAuth}>Question Submitted By: {props.questions[props.questionNumber].auth}</p>
            <br/>

            <div className={classes.clock}>
                <CountdownClock 
                    seconds={6}
                    color="#a1887f"
                    alpha={0.9}
                    size={100}
                    onComplete={props.onClockFinished} />
            </div>
        </Aux>
    );
}

export default LeftMain;