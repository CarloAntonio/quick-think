import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CountdownClock from 'react-countdown-clock';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Winner from './subComps/Winner';

import * as actions from '../../store/actions/actions';
import iClasses from './Game.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
});

class Game extends Component {

    state = {
        gameOver: false
    }

    //fetch data only when component has loaded on the page
    componentDidMount() {
        this.props.onFetchQuestions();
        this.props.onSetPath();
    }

    onAddClicked = (event) => {
        this.props.onAddPoint(this.props.turn);
    }

    onNoPointClicked = () => {
        this.props.onNoAddPoint(this.props.turn);
    }

    onFreshStart = () => {
        this.props.onStartOver();
        this.props.history.push('/');
    }

    onShuffleAndPlayAgain = () => {
        this.props.onFetchQuestions();
        this.props.onPlayAgain();
    }

    render() {

        const { classes } = this.props;

        let question = (
            <CardContent>
                <h1 className={iClasses.questionHidden}>HIDDEN</h1>
            </CardContent>
        );

        let startButton = (
            <Button 
                variant="contained" 
                color="primary"
                onClick={this.props.onHideClock}>
                GO!
            </Button>
        );
        
        if (this.props.hideQuestion !== true) {
            question = (
                <Aux>
                    <div className={iClasses.questionContainer}>
                        <h1 className={iClasses.questionPrompt}>Question:</h1>
                        <br/>
                        <p className={iClasses.questionGenerated}>{this.props.questions[this.props.questionNumber].question}</p>
                        <br/>
                        <p className={iClasses.questionAuth}>Question Submitted By: {this.props.questions[this.props.questionNumber].auth}</p>
                        <br/>
                    </div>
                    <div className={iClasses.clock}>
                        <CountdownClock 
                            className={iClasses.test}
                            seconds={6}
                            color="#a1887f"
                            alpha={0.9}
                            size={100}
                            onComplete={this.props.onClockFinished} />
                    </div>
                </Aux>
            );

            startButton = null;
        }

        let promptAddPoints = (
            <div className={iClasses.promptPoints}>
                <p className={iClasses.addPoints}>
                    Does team {this.props.teams.slice(this.props.turn, this.props.turn + 1)[0].name} deserve to get a point?
                </p>
                <br/>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onAddClicked}>
                    YUP
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onNoPointClicked}>
                    NAH
                </Button>
            </div>
        );

        let showWinner = false;
        let winner = '';
        this.props.teams.forEach(team => {
            if (team.score === this.props.maxScore) {
                showWinner = true;
                winner = team.name;
            }
        });

        return (
            <Aux>
                <Modal show={showWinner} closeModalFx={null}>
                    <Winner
                        winner={winner}
                        onPlayAgain={this.onShuffleAndPlayAgain}
                        onFreshStart={this.onFreshStart}
                        />
                </Modal>
                <div className={iClasses.root}>
                    <Grid container spacing={24}>

                        {this.props.teams.map((team, index) => {
                            return <Grid item xs={6} key={index}>
                                        <div className={this.props.turn === index ? index === 0 ? iClasses.teamActiveLeft : iClasses.teamActiveRight : index === 1 ? iClasses.teamNotActiveRight : iClasses.teamNotActiveLeft  }>
                                            <h1 className={iClasses.teamName}>{team.name}</h1>
                                            <p className={iClasses.score}>{team.score}/{this.props.maxScore}</p>
                                        </div>
                                    </Grid>
                        })}

                        <div>
                            <hr/>
                        </div>

                        <Grid item xs={12} className={iClasses.paper}>
                            <Card className={iClasses.card}>
                                { question }
                                { this.props.hideStartButton ? null : startButton }
                                { this.props.promptAddScore ? promptAddPoints : null }
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.redGame.teams,
        maxScore: state.redGame.maxScore,
        promptAddScore: state.redGame.promptAddScore,
        hideQuestion: state.redGame.hideQuestion,
        hideStartButton: state.redGame.hideStartButton,
        questionNumber: state.redGame.questionNumber,
        turn: state.redGame.turn,
        questions: state.redAPI.questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchQuestions: () => dispatch(actions.fetchQuestions()),
        onHideClock: () => dispatch(actions.hideStartButton()),
        onClockFinished: () => dispatch(actions.clockFinished()),
        onAddPoint: (turn) => dispatch(actions.addPoint(turn)),
        onNoAddPoint: (turn) => dispatch(actions.noAddPoint(turn)),
        onPlayAgain: () => dispatch(actions.playAgain()),
        onStartOver: () => dispatch(actions.startOver()),
        onSetPath: () => dispatch(actions.setAuthRedirectPath('/game')),
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Game));