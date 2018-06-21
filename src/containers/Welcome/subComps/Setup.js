import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import * as actions from '../../../store/actions/actions';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    div: {
        textAlign: 'center'
    },
    title: {
        margin: 'auto'
    }
  });

class setup extends React.Component {

    onConsoleLog = () => {
        console.log(this.state.teamOne);
    }

    render () {
        const { classes } = this.props;

        return (
            <div className={classes.div}>
                <h1 className={ classes.title }>Teams</h1>
                <Input
                    value={this.props.teamOne}
                    className={classes.input}
                    inputProps={{'aria-label': 'Description'}}
                    onChange={(event) => this.props.onTeamOneNameChanged(event)}/>
                <br/>
                <Input
                    value={this.props.teamTwo}
                    className={classes.input}
                    inputProps={{'aria-label': 'Description'}}
                    onChange={(event) => this.props.onTeamTwoNameChanged(event)}/>
                <br/>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.props.startGameHandler}>
                    PLAY
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.onConsoleLog}>
                    Console Log!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teamOne: state.teamOne,
        teamTwo: state.teamTwo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTeamOneNameChanged: (event) => dispatch(actions.teamOneNameChanged(event.target.value)),
        onTeamTwoNameChanged: (event) => dispatch(actions.teamTwoNameChanged(event.target.value)),
    }
}

setup.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(setup));