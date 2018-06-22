import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';

import * as actions from '../../store/actions/actions';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '92vh',
    },
    card: {
        maxWidth: 275,
        margin: 'auto'
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Game extends Component {

    state = {
        gameOver: false
    }

    onStartTimer = () => {
        this.props.onStartClock();
    }

    render() {

        const questions = [
            "Types of dogs",
            "Types of cats",
            "Types of muscles",
            "Types of coffee shops",
            "types of cars"
        ];

        const { classes } = this.props;

        let question = (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        HIDDEN!
                    </Typography>
                </CardContent>
            </Card>
        );

        let startButton = (
            <Button 
                variant="contained" 
                className={classes.button}
                onClick={this.onStartTimer}>
                START!
            </Button>
        );

        let promptAddPoints = (
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={this.props.onAddPoint}>
                +1
            </Button>
        );
        
        if (this.props.hideQuestion !== true) {
            question = (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Question:
                        </Typography>
                        <Typography variant="headline" component="h2">
                            {questions[1]}
                        </Typography>
                    </CardContent>
                </Card>
            );

            startButton = null;
        }

        let game = (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {question}
                            { this.props.hideStartButton ? null : startButton }
                            { this.props.promptAddScore ? promptAddPoints : null }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

        return (
            <Aux>
                <Modal show={this.state.gameOver} closeModalFx={null}>
                    <h1>You Win!</h1>
                </Modal>
                {game}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        promptAddScore: state.promptAddScore,
        hideQuestion: state.hideQuestion,
        hideStartButton: state.hideStartButton
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartClock: () => dispatch(actions.startTimer()),
        onAddPoint: () => dispatch(actions.addPoint())
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Game));