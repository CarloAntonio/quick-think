import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import classes from './AppBar.css';
import * as actions from '../../store/actions/actions';
  
class appBar extends Component {

    state = {
        loginTime: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loginTime: false })
    }

    login = () => {
        this.setState({ loginTime: true })
    }

    render () {

        return (
            <div className={classes.root}>
                {this.state.loginTime ? <Redirect to='/login'/> : null }
                <AppBar position="static">
                    <Toolbar className={classes.bar}>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Boba Shop Games
                        </Typography>
                        { this.props.isAuth || this.props.loggingIn
                            ? null 
                            : <Button
                                variant="contained" 
                                color="secondary" 
                                onClick={this.login} >Login</Button> 
                        }

                        { this.props.isAuth 
                            ? <Button
                                variant="contained" 
                                color="secondary" 
                                onClick={this.props.logout} >Logout</Button>
                            : null }
                            
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.redAuth.token !== null,
        loggingIn: state.redAuth.loggingIn,
        lastPage: state.redAuth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(appBar);