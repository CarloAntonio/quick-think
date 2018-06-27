import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import classes from './AppBar.css';
  
class appBar extends Component {
    state = {
        redirect: false
    }

    goToLogin = () => {
        this.setState({ redirect: true })
    }

    render () {

        let loginRedirect = null;
        if (this.state.redirect) {
            loginRedirect = <Redirect to='/login'/>
        }

        return (
            <div className={classes.root}>
                {loginRedirect}
                <AppBar position="static">
                    <Toolbar className={classes.bar}>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Boba Shop Games
                        </Typography>
                        { this.props.isAuth 
                            ? null 
                            : <Button 
                                color="inherit"
                                onClick={this.goToLogin}>Login</Button> }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        isAuth: state.redAuth.token !== null
    }
}

export default connect(mapPropsToState)(appBar);