import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Aux from '../../../hoc/Aux';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
        minWidth: 180,
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
            {props.teams.map((team, index) => {
                return <Aux
                    key={index}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={index}>Team {index + 1}</InputLabel>
                        <Input
                            inputProps={{
                                name: team.name,
                                id: {index},
                                }}
                            value={team.name}
                            onChange={(event) => props.onTeamNameChanged(event, index)}/>
                    </FormControl>
                    <br/>
                </Aux>
            })}

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