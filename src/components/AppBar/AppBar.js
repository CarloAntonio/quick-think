import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import classes from './AppBar.css';
  
const appBar = (props) => {

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    <Typography variant="title" color="inherit">
                        Boba Shop Games
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

  

export default appBar;