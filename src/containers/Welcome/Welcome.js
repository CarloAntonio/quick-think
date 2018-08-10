import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Setup from './subComps/Setup';

import Spinner from '../../components/UI/Spinner/Spinner';

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
            like: 0,
            dislike: 0,
        }

        this.props.onSubmitQuestion(this.props.token, qObject);
    }

    render() {

        const formElementsArray = [];
        for (let key in this.props.questionForm) {
            formElementsArray.push({
                id: key,
                config: this.props.questionForm[key]
            })
        }

        let form = (
            <form>
                {formElementsArray.map((formElement, index) => {
                    return <div className="form-group" key={index}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id={formElement.config.label} 
                                    aria-describedby="emailHelp"
                                    onChange={(event) => this.props.questionInputChangedHandler(event, formElement.id)} 
                                    placeholder={formElement.config.label}/>
                                {
                                    index === 0
                                    ? <small id="emailHelp" className="form-text text-muted">Please keep in mind kids of all ages will play this game.</small>
                                    : null
                                }
                            </div>
                })}
                
                {/* show spinner when submitting */}
                {this.props.submitting
                        ? <Spinner />
                        : null
                    }

                {this.props.isAuth 
                    ? this.props.submitted
                        ? 
                        <div className="wow fadeInUp">
                            <div className="mb-2">
                                Thanks For Contributing!
                            </div>
                            <button 
                                className={classes.buttonColor + " btn mt-auto align-self-start"}
                                onClick={this.props.onSubmitAnotherQuestion}
                                >
                                Submit Another
                            </button>
                        </div>
                        : 
                        <button
                            className={classes.buttonColor + " btn mt-auto align-self-start"}
                            onClick={this.props.submitQuestionHandler}
                            >
                            Submit
                        </button>
                
                : null
                }
               
            </form>
        );
       

        let addQuestion = null;
        if(this.props.isAuth){
            addQuestion = (
                <div className="col-10 col-sm-12 col-md-12 col-lg-4 p-2 py-4 py-md-2">
                    <h4><u>Add To Question List:</u></h4>
                    { this.props.submitted ? null : form }
                </div>
            )
        }

        let main = (
            <Aux>
                <div className={classes.LeftMain + " wow fadeIn container mx-auto"}>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h2 className="text-center mb-3 mt-1 wow fadeInLeft">Quick Think</h2>
                        </div>

                        <div className={
                                this.props.isAuth 
                                ? "col-10 col-sm-12 col-md-6 col-lg-4 d-none d-sm-flex flex-column p-2 pb-4 pb-lg-2"
                                : "col-10 col-sm-12 col-md-6 col-lg-4 d-none d-sm-flex flex-column p-2 pb-4 pb-lg-2"}>
                            <h4><u>Think Fast!</u></h4>
                            <p>You have 6 seconds to come up with 3 answers to 1 simple question. Sound easy enough right? Well if those neurons aren't crispy, the answer is no, it's hard, harder then you'd expect. 
                                But you got this right? Remember, dont panic!</p>
                            <button
                                className={classes.buttonColor + " mt-auto align-self-start btn wow fadeIn"}
                                onClick={this.startHandler}
                                >
                                Team Setup
                            </button>
                        </div>

                        <div className={
                                this.props.isAuth
                                ? "col-10 col-sm-12 col-md-6 col-lg-4 d-sm-flex flex-column p-2 pb-4 pb-lg-2"
                                : "col-10 col-sm-12 col-md-6 col-lg-4 d-sm-flex flex-column p-2 pb-4 pb-lg-2"}>
                            <h4><u>How To Play:</u></h4>
                            <p>1. Each team will take turns answering a question</p>
                            <p>2. Once the question is shown, the team has 6 second to give 3 answers that fulfill the question's criteria</p>
                            <p>3. A team will recieve a point if they give 3 appropriate answers within 6 seconds</p>
                            <p>4. The game ends after one team reaches the goal score</p>
                            <button
                                className={classes.buttonColor + " mt-auto align-self-start btn wow fadeIn"}
                                onClick={this.quickStartHandler}
                                >
                                Quick Start
                            </button>
                        </div>

                        {addQuestion}
                    </div>
                </div>
            </Aux>
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
                {main}
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