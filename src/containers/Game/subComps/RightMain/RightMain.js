import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Aux from '../../../../hoc/Aux';

import iClasses from './RightMain.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
});

const RightMain = (props) => {

    const { classes } = props;

    return (
        <div>
            <h1 className={iClasses.questionPrompt}>Response:</h1>
            <br/>

            <div>
                <p className={iClasses.addPoints}>Question Likability: {props.like} likes out of {props.total}</p>
                <Line percent={props.like/props.total} strokeWidth="4" strokeColor="#388e3c" />
                <p className={iClasses.loginToRate}>Login to Rate Questions</p>
            </div>

            {props.skipUsed
                ? null
                : <Aux>
                    <br/>
                    <p className={iClasses.addPoints}>
                        Use Free Skip?
                    </p>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={props.onFreeSkip}>
                        SKIP!
                    </Button>
                    <br/>
                   </Aux>
            }

            <br/>
            <p className={iClasses.addPoints}>
                Does team {props.teams.slice(props.turn, props.turn + 1)[0].name} deserve to get a point?
            </p>
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={props.onAddClicked}>
                YUP
            </Button>
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={props.onNoPointClicked}>
                NAH
            </Button>
            
        </div>
    );
}

RightMain.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightMain);