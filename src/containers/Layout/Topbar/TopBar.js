import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import iClasses from './TopBar.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});
  
const TopBar = (props) => {

    const { classes } = props;

    return (
        <div className={iClasses.root}>
            <AppBar position="static">
                <Toolbar className={iClasses.bar}>
                    <IconButton 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="Menu"
                        onClick={() => this.props.toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={iClasses.flex}>
                        Boba Shop Games
                    </Typography>

                    { this.props.path === '/game'
                        ? <Button
                            className={classes.button}
                            variant="contained" 
                            color="secondary" 
                            onClick={this.home} >Home</Button>
                        : null 
                    }

                    { this.props.path === '/game'
                        ? <Button
                            className={classes.button}
                            variant="contained" 
                            color="secondary" 
                            onClick={this.newGame} >New Game</Button>
                        : null 
                    }

                    {/* Implement a new redux state: "playing" */}
                    {/* { this.props.path === '/'
                        ? <Button
                            variant="contained" 
                            color="secondary" 
                            onClick={this.resume} >Resume</Button>
                        : null 
                    } */}


                    { this.props.isAuth || this.props.loggingIn
                        ? null 
                        : <Button
                            className={classes.button}
                            variant="contained" 
                            color="secondary" 
                            onClick={this.login} >Login</Button> 
                    }

                    { this.props.isAuth 
                        ? <Button
                            className={classes.button}
                            variant="contained" 
                            color="secondary" 
                            onClick={this.props.logout} >Logout</Button>
                        : null 
                    }
                        
                </Toolbar>
            </AppBar>
        </div>
    );
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(TopBar));