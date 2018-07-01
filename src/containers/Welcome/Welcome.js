import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Setup from './subComps/Setup';
import LeftMain from './subComps/LeftMain/LeftMain';
import RightMain from './subComps/RightMain/RightMain';

import * as actions from '../../store/actions/actions';
import classes from './Welcome.css';

class Welcome extends Component {
    
    state = {
        start: false,
    }

    componentDidMount() {
        this.props.onSetPath();
    }

    startCancelHandler = () => {
        this.setState({ start: false });
    }

    startHandler = () => {
        this.setState({ start: true });
    }

    newGameHandler = () => {
        this.props.onFetchQuestions();
        this.props.startGame();
        this.props.newGame();
        this.props.history.push('/game');
    }

    quickStartHandler = () => {
        this.props.onFetchQuestions();
        this.props.startGame();
        this.props.quickStart();
        this.props.history.push('/game');
    }

    submitQuestionHandler = () => {
        //create question object
        const qObject = {
            auth: this.props.questionForm.author.value,
            question: this.props.questionForm.question.value,
            rating: 1000
        }

        this.props.onSubmitQuestion(this.props.token, qObject);
    }

    render() {

        let main = (
            <Aux>
                <Grid item xs={12} sm={6}>
                    <LeftMain />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RightMain 
                        questionForm={this.props.questionForm}
                        questionInputChangedHandler={this.props.questionInputChangedHandler}
                        isAuth={this.props.isAuth}
                        submitted={this.props.submitted}
                        submitting={this.props.submitting}
                        onSubmitAnotherQuestion={this.props.onSubmitAnotherQuestion}
                        submitQuestionHandler={this.submitQuestionHandler}
                        startHandler={this.startHandler}
                        quickStartHandler={this.quickStartHandler}
                        />
                </Grid>
            </Aux>
        );

        let body = (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    {main}
                </Grid>
            </div>
        );

        return (
            <Aux>
                <Modal show={this.state.start} closeModalFx={this.startCancelHandler}>
                    <Setup 
                        newGameHandler={this.newGameHandler}
                        teams={this.props.teams}
                        onTeamNameChanged={this.props.onTeamNameChanged}
                        maxScore={this.props.maxScore}
                        onChangeMaxScore={this.props.onChangeMaxScore}
                        />
                </Modal>
                {body}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.redGame.teams,
        maxScore: state.redGame.maxScore,
        isAuth: state.redAuth.token !== null,
        token: state.redAuth.token,
        submitted: state.redAPI.submitted,
        submitting: state.redAPI.submitting,
        questionForm: state.redAPI.questionForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchQuestions: () => dispatch(actions.fetchQuestions()),
        onTeamNameChanged: (event, index) => dispatch(actions.teamNameChanged(event.target.value, index)),
        onChangeMaxScore: (event) => dispatch(actions.maxScoreChanged(parseInt(event.target.value, 10))),
        onSetPath: () => dispatch(actions.setAuthRedirectPath('/')),
        startGame: () => dispatch(actions.startGame()),
        quickStart: () => dispatch(actions.quickStart()),
        newGame: () => dispatch(actions.newGame()), 
        onSubmitQuestion: (token, qObject) => dispatch(actions.submitQuestion(token, qObject)),
        onSubmitAnotherQuestion: () => dispatch(actions.submitAnotherQuestion()),
        questionInputChangedHandler: (event, id) => dispatch(actions.questionInputChangedHandler(event, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);