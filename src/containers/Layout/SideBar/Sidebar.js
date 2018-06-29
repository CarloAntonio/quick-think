import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const SideBar = (props) => {

    const { classes } = props;

    const sideList = (
        <div className={classes.list}>
          <List>
            <ListItem 
                button
                onClick={() => props.login}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
            </ListItem>

            <ListItem 
                button
                onClick={() => props.toggleDrawer(true)}>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Send mail" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItem>
          </List>
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