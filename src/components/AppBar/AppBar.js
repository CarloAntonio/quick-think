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
        goLogin: false,
        goHome: false,
        goResume: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            goLogin: false,
            goHome: false ,
            goResume: false,
        })
    }

    login = () => {
        this.setState({ goLogin: true })
    }

    home = () => {
        this.setState({ goHome: true })
    }

    resume = () => {
        this.setState({ goResume: true })
    }

    render () {

        return (
            <div className={classes.root}>
                {this.state.goLogin ? <Redirect to='/login'/> : null }
                {this.state.goHome ? <Redirect to='/' /> : null }
                {this.state.goResume ? <Redirect to='/game' /> : null }
                <AppBar position="static">
                    <Toolbar className={classes.bar}>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Boba Shop Games
                        </Typography>

                        { this.props.path === '/game'
                            ? <Button
                                variant="contained" 
                                color="secondary" 
                                onClick={this.home} >Home</Button>
                            : null 
                        }

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
                                variant="contained" 
                                color="secondary" 
                                onClick={this.login} >Login</Button> 
                        }

                        { this.props.isAuth 
                            ? <Button
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
}

const mapStateToProps = state => {
    return {
        isAuth: state.redAuth.token !== null,
        loggingIn: state.redAuth.loggingIn,
        path: state.redAuth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(appBar);