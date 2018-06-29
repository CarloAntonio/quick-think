import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import Aux from '../../hoc/Aux';
import TopBar from './Topbar/TopBar';
import Sidebar from './SideBar/Sidebar';

import * as actions from '../../store/actions/actions';

class Layout extends Component {

    state = {
        showSideDrawer: false,
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

    toggleDrawer = (show) => {
        this.setState({ showSideDrawer: show });
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

    newGame = () => {
        this.props.shuffle();
        this.props.newGame();
    }

    render () {

        return (
            <Aux>
                {this.state.goLogin ? <Redirect to='/login'/> : null }
                {this.state.goHome ? <Redirect to='/' /> : null }
                {this.state.goResume ? <Redirect to='/game' /> : null }
                <TopBar 
                    isAuth={this.props.isAuth}
                    loggingIn={this.props.loggingIn}
                    path={this.props.path}
                    playing={this.props.playing}
                    toggleDrawer={this.toggleDrawer}
                    login={this.login}
                    home={this.home}
                    resume={this.resume}
                    newGame={this.newGame}/>
                <Sidebar 
                    isAuth={this.props.isAuth}
                    loggingIn={this.props.loggingIn}
                    path={this.props.path}
                    playing={this.props.playing}
                    showSideDrawer={this.state.showSideDrawer}
                    toggleDrawer={this.toggleDrawer}
                    login={this.login}
                    home={this.home}
                    resume={this.resume}
                    newGame={this.newGame}/>
                <main>
                    {this.props.children}
                </main> 
            </Aux>   
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.redAuth.token !== null,
        loggingIn: state.redAuth.loggingIn,
        path: state.redAuth.authRedirectPath,
        playing: state.redGame.playing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.userLogout()),
        newGame: () => dispatch(actions.newGame()),
        shuffle: () => dispatch(actions.fetchQuestions()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);