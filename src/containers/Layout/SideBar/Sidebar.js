import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import NewIcon from '@material-ui/icons/FiberNew';
import LoginIcon from '@material-ui/icons/Fingerprint';
import LogoutIcon from '@material-ui/icons/HighlightOff';
import ResumeIcon from '@material-ui/icons/Done';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  sidebarHeader: {
      backgroundColor: theme.palette.secondary.main
  },
});

const SideBar = (props) => {

    const { classes } = props;

    const sideList = (
        <div className={classes.list}>
            <ListItem className={classes.sidebarHeader}>
                <ListItemText primary="Boba Shop Games" />
            </ListItem>
            <Divider />
            <List>

                { props.path === '/login'
                    ? (
                        <ListItem 
                            button
                            onClick={props.home}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    )
                    : null 
                }

                { props.path === '/game'
                    ? (
                        <ListItem 
                            button
                            onClick={props.home}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    )
                    : null 
                }

                { props.path === '/game'
                    ? (
                        <ListItem 
                            button
                            onClick={props.newGame}>
                            <ListItemIcon>
                                <NewIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Game" />
                        </ListItem>
                    )
                    : null 
                }

                { props.path === '/' && props.playing
                    ? (
                        <ListItem 
                            button
                            onClick={props.resume}>
                            <ListItemIcon>
                                <ResumeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Resume" />
                        </ListItem>
                    )
                    : null 
                }


                { props.isAuth || props.loggingIn
                    ? null 
                    : (
                        <ListItem 
                            button
                            onClick={props.login}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    )
                }

                { props.isAuth 
                    ? (
                        <ListItem 
                            button
                            onClick={props.logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    )
                    : null 
                }

            </List>
            <Divider />
            <ListItem 
                className={classes.sidebarHeader}
                button
                onClick={() => window.location = 'https://www.carlobilbao.com'}>
                <ListItemText primary="Created By Carlo Bilbao" />
            </ListItem>
        </div>
      );

    return (
        <Drawer open={props.showSideDrawer} onClose={() => props.toggleDrawer(false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={() => props.toggleDrawer(false)}
                onKeyDown={() => props.toggleDrawer(false)}
            >
                {sideList}
            </div>
        </Drawer>
    );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);