import React from 'react';
import CountdownClock from 'react-countdown-clock';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';

import iClasses from './LeftMain.css';
import Aux from '../../../../hoc/Aux';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

const LeftMain = (props) => {

    const { classes } = props;

    return (
        <Aux>
            <h1 className={iClasses.questionPrompt}>Question:</h1>
            <br/>
            <p className={iClasses.questionGenerated}>{props.questions[props.questionNumber].question}</p>
            <br/>
            <p className={iClasses.questionAuth}>Question Submitted By: {props.questions[props.questionNumber].auth}</p>
            <br/>

            <div className={iClasses.clock}>
                <CountdownClock 
                    seconds={6}
                    color="#a1887f"
                    alpha={0.9}
                    size={100}
                    onComplete={props.onClockFinished} />
            </div>

            { props.isAuth && !props.submittedFeedback
                ? <div>
                    <p>What'd you think of this question?</p>
                    <Button 
                        variant="fab" 
                        color="primary" 
                        aria-label="like" 
                        className={classes.button}
                        onClick={props.handleLike}>
                        <LikeIcon />
                    </Button>
                    <Button 
                        variant="fab" 
                        color="primary" 
                        aria-label="dislike" 
                        className={classes.button}
                        onClick={props.handleDislike}>
                        <DislikeIcon />
                    </Button>
                  </div>
                : null
            }

            { props.isAuth && props.submittedFeedback
                ? <div>
                    <p className={iClasses.thanks + " wow fadeInUp"}>Thanks For The Feedback!</p>
                  </div>
                : null
            }
        </Aux>
    );
}

LeftMain.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(LeftMain);