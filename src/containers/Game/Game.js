import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CountdownClock from 'react-countdown-clock';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Winner from './subComps/Winner';

import * as actions from '../../store/actions/actions';
import iClasses from './Game.css';
import questions from './Questions';
import { shuffle } from '../../utility/utility';

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
    clock: {
        height: '120px',
        paddingLeft: '30%'
    }
});

const shuffledQuestions = shuffle(questions);

class Game extends Component {

    state = {
        gameOver: false
    }

    onStartTimer = () => {
        this.props.onStartClock();
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
                        <br/>
                        <Typography 
                            variant="headline" 
                            component="h2">
                            {shuffledQuestions[this.props.questionNumber].question}
                        </Typography>
                        <br/>
                        <Typography 
                            variant="subheading" 
                            component="h2">
                            Questing Submitted By: {shuffledQuestions[this.props.questionNumber].auth}
                        </Typography>
                        <br/>
                    </CardContent>
                    <div className={classes.clock}>
                        <CountdownClock 
                            seconds={5}
                            color="#000"
                            alpha={0.9}
                            size={100}
                            onComplete={null} />
                    </div>
                    
                </Card>
            );

            startButton = null;
        }

        let promptAddPoints = (
            <div>
                <Typography 
                    variant="subheading" 
                    component="h2">
                    Does team {this.props.teams.slice(this.props.turn, this.props.turn + 1)[0].name} deserve to get a point? 
                </Typography>
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
        this.props.teams.forEach(team => {
            if (team.score === this.props.maxScore) showWinner = true;
        });

        return (
            <Aux>
                <Modal show={showWinner} closeModalFx={null}>
                    <Winner
                        teamOneName={this.props.teamOneName} 
                        teamTwoName={this.props.teamTwoName}
                        teamOneScore={this.props.teamOneScore}
                        teamTwoScore={this.props.teamTwoScore}
                        onPlayAgain={this.props.onPlayAgain}
                        onFreshStart={this.onFreshStart}
                        />
                </Modal>
                <div className={iClasses.root}>
                    <Grid container spacing={24}>
                        {this.props.teams.map((team, index) => {
                            return <Grid item xs={12} sm={6} key={index}>
                                        <Paper className={this.props.turn === index ? classes.teamActive : classes.teamNotActive}>
                                            <h1>{team.name}</h1>
                                            <p className={iClasses.score}>{team.score}</p>
                                        </Paper>
                                    </Grid>
                        })}
                        <Grid item xs={12}>
                            <Paper className={iClasses.paper}>
                                { question }
                                { this.props.hideStartButton ? null : startButton }
                                { this.props.promptAddScore ? promptAddPoints : null }
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.teams,
        maxScore: state.maxScore,
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
        onPlayAgain: () => dispatch(actions.playAgain()),
        onStartOver: () => dispatch(actions.startOver())
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Game));