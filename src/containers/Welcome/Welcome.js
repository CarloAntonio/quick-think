import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Setup from './subComps/Setup';

import classes from './Welcome.css';

class Welcome extends Component {
    
    state = {
        start: false
    }

    startCancelHandler = () => {
        this.setState({ start: false });
    }

    startHandler = () => {
        this.setState({ start: true });
    }

    startGameHandler = () => {
        this.props.history.push('/game');
    }

    render() {

        let intro = (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className={ classes.welcome }>
                                <h1>Welcome to Quick Think!</h1>
                                <p>The game where you've got to... think quick! Thanks for playing! <br/><br/> This game was inspired by playing games at bubble tea shops. Special shout out to the Fadrigo and Roderos family :)</p>
                            </div>
                            <div className= { classes.instruct }>
                                <h1>How To Play:</h1>
                                <p>Intructions: Pick team names, take turns coming up with three items that fit the category, first team to 10 points wins.</p>
                            </div>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={this.startHandler}
                                >
                                Start
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

        return (
            <Aux>
                <Modal show={this.state.start} closeModalFx={this.startCancelHandler}>
                    <Setup startGameHandler={this.startGameHandler}/>
                </Modal>
                {intro}
            </Aux>
        );
    }
}

export default Welcome;