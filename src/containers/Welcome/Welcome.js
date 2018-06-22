import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Setup from './subComps/Setup';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '92vh'
    },
  });

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

        const { classes } = this.props;

        let intro = (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Welcome to Quick Think!</h1>
                            <p>This game was inspired by playing games at bubble tea shops. Special shout out to the Fadrigo and Roderos family :)</p>
                            <h1>How To Play:</h1>
                            <p>Intructions: ipsum lorem</p>
                            <button onClick={this.startHandler}>START</button>
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

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Welcome);