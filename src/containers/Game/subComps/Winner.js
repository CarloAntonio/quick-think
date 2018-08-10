import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import iClasses from './Winner.css';

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

    return (
        <div className={classes.result}>
            <h3 className={iClasses.style}>Team {props.winner} Wins!</h3>
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
    );
    
}

winner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(winner);