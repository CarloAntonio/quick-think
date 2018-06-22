import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';

import * as actions from '../../store/actions/actions';
import iClasses from './Game.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const questions = [
    "Types of dogs",
    "Types of cats",
    "Types of muscles",
    "Types of coffee shops",
    "types of cars"
];

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    teamActive: {
        margin: '16px',
        marginBottom: '0px',
        padding: '16px',
        textAlign: 'center',
        height: '40vh',
        backgroundColor: '#fff350',
    },
    teamNotActive: {
        margin: '16px',
        marginBottom: '0px',
        padding: '16px',
        textAlign: 'center',
        height: '40vh',
        backgroundColor: '#ccc',
    },
  });

class Game extends Component {

    state = {
        gameOver: false
    }

    onStartTimer = () => {
        this.props.onStartClock();
    }

    onAddClicked = (event) => {
        event.preventDefault();

        this.props.onAddPoint(this.props.turn);
    }

    onNoPointClicked = (event) => {
        event.preventDefault();

        this.props.onNoAddPoint(this.props.turn);
    }

    render() {

        const { classes } = this.props;

        let question = (
            <Card className={iClasses.card}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        HIDDEN
                    </Typography>
                </CardContent>
            </Card>
        );

        let startButton = (
            <Button 
                variant="contained" 
                color="primary"
                onClick={this.onStartTimer}>
                START
            </Button>
        );

        let promptAddPoints = (
            <div>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onAddClicked}>
                    +1
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onNoPointClicked}>
                    X
                </Button>
            </div>

        );
        
        if (this.props.hideQuestion !== true) {
            question = (
                <Card className={iClasses.card}>
                    <CardContent>
                        <Typography 
                            variant="display1" 
                            color="primary"
                            gutterBottom>
                            Question:
                        </Typography>
                        <br/><br/>
                        <Typography 
                            variant="headline" 
                            component="h2">
                            {questions[this.props.questionNumber]}
                        </Typography>
                        <br/><br/>
                    </CardContent>
                </Card>
            );

            startButton = null;
        }

        let game = (
            <div className={iClasses.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={this.props.turn === 0 ? classes.teamActive : classes.teamNotActive}>
                            <h1>{this.props.teamOneName}</h1>
                            <p className={iClasses.score}>{this.props.teamOneScore}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={this.props.turn === 1 ? classes.teamActive : classes.teamNotActive}>
                            <h1>{this.props.teamTwoName}</h1>
                            <p className={iClasses.score}>{this.props.teamTwoScore}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={iClasses.paper}>
                            { question }
                            { this.props.hideStartButton ? null : startButton }
                            { this.props.promptAddScore ? promptAddPoints : null }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

        return (
            <Aux>
                <Modal show={this.props.teamOneScore === 2 || this.props.teamTwoScore === 2} closeModalFx={null}>
                    <h1>You Win!</h1>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={iClasses.button}
                        onClick={this.props.onPlayAgain}>
                        Play Again?
                    </Button>
                </Modal>
                {game}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        teamOneName: state.teamOneName,
        teamTwoName: state.teamTwoName,
        teamOneScore: state.teamOneScore,
        teamTwoScore: state.teamTwoScore,
        promptAddScore: state.promptAddScore,
        hideQuestion: state.hideQuestion,
        hideStartButton: state.hideStartButton,
        questionNumber: state.questionNumber,
        turn: state.turn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartClock: () => dispatch(actions.startTimer()),
        onAddPoint: (turn) => dispatch(actions.addPoint(turn)),
        onNoAddPoint: (turn) => dispatch(actions.noAddPoint(turn)),
        onPlayAgain: () => dispatch(actions.playAgain())
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Game));