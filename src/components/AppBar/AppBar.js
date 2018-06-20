import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    textSize: {
        fontSize: '45px'
    }
  };

  
const appBar = (props) => {

    const { classes } = props;
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="title" color="inherit" className={classes.textSize}>
                    Quick Think!
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

appBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(appBar);