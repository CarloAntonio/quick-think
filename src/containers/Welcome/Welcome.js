import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Setup from './subComps/Setup';

import * as actions from '../../store/actions/actions';
import iClasses from './Welcome.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
});

class Welcome extends Component {
    
    state = {
        start: false
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

    startGameHandler = () => {
        this.props.startGame();
        this.props.history.push('/game');
    }

    quickStart = () => {
        this.props.startGame();
        this.props.quickStart();
        this.props.history.push('/game');
    }

    render() {

        const { classes } = this.props;

        let intro = (
            <div className={iClasses.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={iClasses.paper}>
                            <div className={ iClasses.welcome }>
                                <h1>Welcome to Quick Think!</h1>
                                <p>The game where you have 6 seconds to think of 3 things that match the category given to you or your team. It's easy, as long as you don't panic :)</p>
                            </div>
                            <div className= { iClasses.instruct }>
                                <h1>How To Play:</h1>
                                <p>Each team will take turns answering a question</p>
                                <p>Once the question is shown, the team has 6 second to give 3 answers that fulfill the question's criteria</p>
                                <p>A team will recieve a point if they give 3 appropriate answers within 6 seconds</p>
                                <p>The game ends after one team reaches the goal score</p>
                            </div>
                            <div className= { iClasses.instruct }>
                                <h1>Getting Started:</h1>
                                <p>1. Press Start</p>
                                <p>2. Pick Team Names</p>
                                <p>3. Pick Score to Reach</p>
                            </div>
                            <Button 
                                className={classes.button}
                                variant="contained" 
                                color="primary"
                                onClick={this.startHandler}
                                >
                                New Game
                            </Button>
                            <Button 
                                className={classes.button}
                                variant="contained" 
                                color="primary"
                                onClick={this.quickStart}
                                >
                                Quick Start
                            </Button>
                            <div className={ iClasses.special }>
                                <p>Special thanks to the Fadrigo and Roderos family, with whom I first played this game.</p>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

        return (
            <Aux>
                <Modal show={this.state.start} closeModalFx={this.startCancelHandler}>
                    <Setup 
                        startGameHandler={this.startGameHandler}
                        teams={this.props.teams}
                        onTeamNameChanged={this.props.onTeamNameChanged}
                        maxScore={this.props.maxScore}
                        onChangeMaxScore={this.props.onChangeMaxScore}
                        />
                </Modal>
                {intro}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.redGame.teams,
        maxScore: state.redGame.maxScore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTeamNameChanged: (event, index) => dispatch(actions.teamNameChanged(event.target.value, index)),
        onChangeMaxScore: (event) => dispatch(actions.maxScoreChanged(parseInt(event.target.value, 10))),
        onSetPath: () => dispatch(actions.setAuthRedirectPath('/')),
        startGame: () => dispatch(actions.startGame()),
        quickStart: () => dispatch(actions.quickStart()),
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Welcome));