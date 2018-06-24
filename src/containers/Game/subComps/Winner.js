import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    result: {
        textAlign: 'center'
    }
});

const winner = (props) => {

    const { classes } = props;

    let winner = (
        <h1>Team {props.teamTwoName} Wins!</h1>
    );

    if(props.teamOneScore > props.teamTwoScore) {
        winner = (
            <h1>Team {props.teamOneName} Wins!</h1>
        );
    }

    return (
        <div className={classes.result}>
            {winner}
            <div>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={props.onPlayAgain}>
                    Play Again?
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={props.onFreshStart}>
                    Start Over
                </Button>
            </div>
        </div>
    )
}

winner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(winner);