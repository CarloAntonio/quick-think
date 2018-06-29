import React from 'react';
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

    let { classes } = props;

    console.log(classes);

    return (
        <div className={iClasses.root}>
            <AppBar position="static">
                <Toolbar className={iClasses.bar}>
                    <IconButton 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="Menu"
                        onClick={() => props.toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={iClasses.flex}>
                        Boba Shop Games
                    </Typography>

                    <div className={iClasses.buttonWrap}>

                        { props.path === '/game'
                            ? <Button
                                className={classes.button}
                                variant="contained" 
                                color="secondary" 
                                onClick={props.home} >Home</Button>
                            : null 
                        }

                        { props.path === '/game'
                            ? <Button
                                className={classes.button}
                                variant="contained" 
                                color="secondary" 
                                onClick={props.newGame} >New Game</Button>
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


                        { props.isAuth || props.loggingIn
                            ? null 
                            : <Button
                                className={classes.button}
                                variant="contained" 
                                color="secondary" 
                                onClick={props.login} >Login</Button> 
                        }

                        { props.isAuth 
                            ? <Button
                                className={classes.button}
                                variant="contained" 
                                color="secondary" 
                                onClick={props.logout} >Logout</Button>
                            : null 
                        }

                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(TopBar));