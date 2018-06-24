import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    button: {
        margin: theme.spacing.unit,
    },
    div: {
        textAlign: 'center'
    },
    title: {
        margin: 'auto'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
  });

const setup = (props) => {

    const { classes } = props;

    return (
        <div className={classes.div}>
            <h1 className={ classes.title }>New Game</h1>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="team-one">Team One</InputLabel>
                <Input
                    inputProps={{
                        name: 'teamOne',
                        id: 'team-one',
                        }}
                    value={props.teamOneName}
                    onChange={(event) => props.onTeamOneNameChanged(event)}/>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="team-two">Team Two</InputLabel>
                <Input
                    inputProps={{
                        name: 'teamTwo',
                        id: 'team-two',
                        }}
                    value={props.teamTwoName}
                    onChange={(event) => props.onTeamTwoNameChanged(event)}/>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="max-score">Play Up To</InputLabel>
                <Select
                    value={props.maxScore}
                    onChange={(event) => props.onChangeMaxScore(event)}
                    inputProps={{
                    name: 'maxScore',
                    id: 'max-score',
                    }}
                >
                    <MenuItem value={props.maxScore}>
                    <em>Two</em>
                    </MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={15}>Fifteen</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={25}>Twenty-Five</MenuItem>
                </Select>
            </FormControl>
            <br />
            <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={props.startGameHandler}>
                PLAY
            </Button>
        </div>
    );

}

setup.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(setup);