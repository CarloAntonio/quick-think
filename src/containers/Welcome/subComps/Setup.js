import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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

    onTeamOneChanged = (event) => {
        this.setState({ teamOne: event.target.value });
    }

    onTeamTwoChanged = (event) => {
        this.setState({ teamTwo: event.target.value });
    }

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
                    onChange={(event) => this.onTeamOneChanged(event)}/>
                <br/>
                <Input
                    value={this.props.teamTwo}
                    className={classes.input}
                    inputProps={{'aria-label': 'Description'}}
                    onChange={(event) => this.onTeamTwoChanged(event)}/>
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

setup.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default connect(mapStateToProps)(withStyles(styles)(setup));