import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CountdownClock from 'react-countdown-clock';

import LikeIcon from '@material-ui/icons/ThumbUp';
import DislikeIcon from '@material-ui/icons/ThumbDown';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Winner from './subComps/Winner';
import ConsoleArea from './subComps/ConsoleArea/ConsoleArea';

import * as actions from '../../store/actions/actions';
import classes from './Game.css';

class Game extends Component {

    state = {
        gameOver: false
    }

    //fetch data only when component has loaded on the page
    componentDidMount() {
        if(this.props.questions.length === 0) {
            this.props.onFetchQuestions();
            this.props.startGame();
        }
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

    onHandleLike = () => {
        this.props.onHandleFeedback(
            this.props.token,
            { 
                questionId: this.props.questions[this.props.questionNumber].id,
                type: 'like',
                newValue: this.props.questions[this.props.questionNumber].like + 1
            }
        )
    }

    onHandleDislike = () => {
        this.props.onHandleFeedback(
            this.props.token,
            { 
                questionId: this.props.questions[this.props.questionNumber].id,
                type: 'dislike',
                newValue: this.props.questions[this.props.questionNumber].dislike + 1
            }
        )
    }

    render() {

        //Check if there's a winner
        let showWinner = false;
        let winner = '';
        this.props.teams.forEach(team => {
            if (team.score === this.props.maxScore) {
                showWinner = true;
                winner = team.name;
            }
        });

        let score = (
            <div className="row mt-4">
                {this.props.teams.map((team, index) => {
                    return <div className="col-6 d-flex flex-column pb-2 p-md-4" key={index}>
                                <h5 className={classes.teamName + " text-center"}>{team.name}</h5>
                                <h5 className={classes.subtitle + " text-center"}>{team.score}/{this.props.maxScore}</h5>
                            </div>
                })}
            </div>
        );

        let question = (
            <div>
                <h5 className={classes.hidden + " text-center mb-1"}>Hidden</h5>
                <div className="d-flex justify-content-center mt-5">
                    <Button 
                        className={classes.button}
                        variant="contained" 
                        color="primary"
                        onClick={this.props.onHideClock}>
                        GO!
                    </Button> 
                </div>
            </div>
        );
        if(!this.props.hideQuestion) {
            question = (
                <div>
                    <h5 className={classes.subtitle + " text-center mb-1"}>{this.props.questions[this.props.questionNumber].question}</h5>
                    <p className={classes.subline + " text-center mb-0"}>Submitted By: {this.props.questions[this.props.questionNumber].auth}</p>
                    <div className={classes.clock + " d-flex justify-content-center mt-2"}>
                        <CountdownClock 
                            seconds={6}
                            color="#a1887f"
                            alpha={0.9}
                            size={100}
                            onComplete={this.props.onClockFinished} />
                    </div>
                </div>
            )
        }

        let dash = null;
        if(this.props.promptAddScore){
            dash = (
                <ConsoleArea
                skipUsed={this.props.skipUsed}
                onFreeSkip={this.props.onFreeSkip}
                teams={this.props.teams}
                turn={this.props.turn}
                onAddClicked={this.onAddClicked}
                onNoPointClicked={this.onNoPointClicked}
                like={this.props.questions[this.props.questionNumber].like}
                total={this.props.questions[this.props.questionNumber].like + this.props.questions[this.props.questionNumber].dislike}/> 
            )
        }

        let feedback = null;
        if(this.props.isAuth && !this.props.submittedFeedback && !this.props.hideQuestion) {
            feedback = (
                <div>
                    <p className={classes.subtitle + " text-center"}>What'd you think of this question?</p>
                    <div className="d-flex justify-content-center">
                        <Button 
                            variant="fab" 
                            color="primary" 
                            aria-label="like" 
                            className={classes.button}
                            onClick={this.onHandleLike}>
                            <LikeIcon />
                        </Button>
                        <Button 
                            variant="fab" 
                            color="primary" 
                            aria-label="dislike" 
                            className={classes.button}
                            onClick={this.onHandleDislike}>
                            <DislikeIcon />
                        </Button>
                    </div>
                </div>
            )
        }

        let thanks = null;
        if(this.props.isAuth && this.props.submittedFeedback) {
            thanks = (
                <div>
                    <p className={classes.subline + " wow fadeInUp text-center"}>Thanks For The Feedback!</p>
                </div>
            )
        }

        //Main Game Content
        let main = (
            <div className="container">
                { score }
                <div>
                    <div className={classes.main + " col-xl-10 mx-auto pt-3"}>
                        { question }
                        { dash }
                        { feedback }
                        { thanks }
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
                <Card className={classes.bg}>
                    {main}
                </Card>
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
        skipUsed: state.redGame.skipUsed,
        isAuth: state.redAuth.token !== null,
        token: state.redAuth.token,
        submittedFeedback: state.redGame.submittedFeedback
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
        startGame: () => dispatch(actions.startGame()),
        onStartOver: () => dispatch(actions.startOver()),
        onSetPath: () => dispatch(actions.setAuthRedirectPath('/game')),
        onFreeSkip: () => dispatch(actions.skipUsed()),
        onHandleFeedback: (token, bundle) => dispatch(actions.handleFeedback(token, bundle)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);