import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import iClasses from './ConsoleArea.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
});

const ConsoleArea = (props) => {

    const { classes } = props;

    let skip = null;
    if(props.onFreeSkip){
        skip = (
            <Button 
                variant="contained" 
                color="primary" 
                className={
                    props.skipUsed
                    ? classes.button + " col-4"
                    : classes.button + " col-3"}
                onClick={props.onFreeSkip}>
                SKIP!
            </Button>
        )
    }

    return (
        <div>
            <p className={iClasses.subtitle + " mt-3 mb-0"}>
                Point for team {props.teams.slice(props.turn, props.turn + 1)[0].name}?
            </p>
            <div className="row d-flex justify-content-center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={
                        props.skipUsed
                        ? classes.button + " col-4"
                        : classes.button + " col-3"}
                    onClick={props.onAddClicked}>
                    YUP
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={
                        props.skipUsed
                        ? classes.button + " col-4"
                        : classes.button + " col-3"}
                    onClick={props.onNoPointClicked}>
                    NAH
                </Button>
                { skip }
            </div>
           
            <div className="mt-3">
                <p className={iClasses.subtitle + " mb-0"}>Question Likability: {props.like} likes out of {props.total}</p>
                <Line percent={props.like/props.total * 100} strokeWidth="3" strokeColor="#388e3c" />
                <p className={iClasses.subline}>Login to Rate Questions</p>
            </div>

        </div>
    );
}

ConsoleArea.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsoleArea);