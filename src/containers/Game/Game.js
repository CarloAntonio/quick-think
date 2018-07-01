import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Winner from './subComps/Winner';
import LeftMain from './subComps/LeftMain/LeftMain';
import RightMain from './subComps/RightMain/RightMain';

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
        if(this.props.questions.length === 0) this.props.onFetchQuestions();
        this.props.onSetPath();
    }

    onAddClicked = (event) => {
        this.props.onAddPoint(this.props.turn);
    }

    onNoPointClicked = () => {
        this.props.onNoAddPoint(this.props.turn);
    }

    onFreshStart = () => {
        this.props.onFetchQuestions();
        this.props.onStartOver();
        this.props.history.push('/');
    }

    onShuffleAndPlayAgain = () => {
        this.props.onFetchQuestions();
        this.props.onNewGame();
    }

    render() {

        const { classes } = this.props;

        //Check if there's a winner
        let showWinner = false;
        let winner = '';
        this.props.teams.forEach(team => {
            if (team.score === this.props.maxScore) {
                showWinner = true;
                winner = team.name;
            }
        });

        //Main Game Content
        let main = (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className={iClasses.questionContainer}>
                            { this.props.hideQuestion
                                ? <CardContent>
                                    <h1 className={iClasses.questionHidden}>HIDDEN</h1>
                                  </CardContent>
                                : <LeftMain 
                                    questions={this.props.questions}
                                    questionNumber={this.props.questionNumber}
                                    onClockFinished={this.props.onClockFinished}/>
                            }
                            { this.props.hideStartButton 
                                ? null 
                                : <Button 
                                className={classes.button}
                                variant="contained" 
                                color="primary"
                                onClick={this.props.onHideClock}>
                                GO!
                                  </Button> 
                            }
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className={iClasses.questionContainer}>
                            { this.props.promptAddScore 
                                ? <RightMain 
                                    skipUsed={this.props.skipUsed}
                                    onFreeSkip={this.props.onFreeSkip}
                                    teams={this.props.teams}
                                    turn={this.props.turn}
                                    onAddClicked={this.onAddClicked}
                                    onNoPointClicked={this.onNoPointClicked}/> 
                                : null }
                        </div>
                    </div>
                </div>
            </div>
        )

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
                                        <div className={
                                                this.props.turn === index 
                                                ? index === 0 
                                                    ? iClasses.teamActiveLeft 
                                                    : iClasses.teamActiveRight 
                                                : index === 1 
                                                    ? iClasses.teamNotActiveRight 
                                                    : iClasses.teamNotActiveLeft  
                                            }>
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
                                {main}
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
        skipUsed: state.redGame.skipUsed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchQuestions: () => dispatch(actions.fetchQuestions()),
        onHideClock: () => dispatch(actions.hideStartButton()),
        onClockFinished: () => dispatch(actions.clockFinished()),
        onAddPoint: (turn) => dispatch(actions.addPoint(turn)),
        onNoAddPoint: (turn) => dispatch(actions.noAddPoint(turn)),
        onNewGame: () => dispatch(actions.newGame()),
        onStartOver: () => dispatch(actions.startOver()),
        onSetPath: () => dispatch(actions.setAuthRedirectPath('/game')),
        onFreeSkip: () => dispatch(actions.skipUsed()),
    }
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Game));