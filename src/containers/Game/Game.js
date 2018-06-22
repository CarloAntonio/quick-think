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
    teamActive: {
        marginTop: '16px',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: '#cdcdcd',
        height: '45vh'
    },
    teamNonactive: {
        marginTop: '16px',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '45vh'
    },
    score: {
        fontSize: '72px'
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '45vh',
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

const questions = [
    "Types of dogs",
    "Types of cats",
    "Types of muscles",
    "Types of coffee shops",
    "types of cars"
];

class Game extends Component {

    state = {
        gameOver: false
    }

    onStartTimer = () => {
        this.props.onStartClock();
    }

    onAddClicked = (e) => {
        e.preventDefault();

        this.props.onAddPoint(this.props.turn);
    }

    render() {

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
            <div>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onAddClicked}>
                    +1
                </Button>
            </div>

        );
        
        if (this.props.hideQuestion !== true) {
            question = (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Question:
                        </Typography>
                        <Typography variant="headline" component="h2">
                            {questions[this.props.questionNumber]}
                        </Typography>
                    </CardContent>
                </Card>
            );

            startButton = null;
        }

        let game = (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper className={classes.teamActive}>
                            <h1>{this.props.teamOneName}</h1>
                            <p className={classes.score}>{this.props.teamOneScore}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.teamNonactive}>
                            <h1>{this.props.teamTwoName}</h1>
                            <p className={classes.score}>{this.props.teamTwoScore}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
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
        onAddPoint: (turn) => dispatch(actions.addPoint(turn))
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Game));