import React from 'react';
import PropTypes from 'prop-types';

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

            {props.skipUsed
                ? null
                : <Aux>
                    <br/>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={props.onFreeSkip}>
                        FREE SKIP!
                    </Button>
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