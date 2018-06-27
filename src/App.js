import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './components/AppBar/AppBar';

//Containers
import Welcome from './containers/Welcome/Welcome';
import Game from './containers/Game/Game';
import Login from './containers/Login/Login';

class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path='/game' component={Game} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Welcome} />
        <Redirect to='/' />
      </Switch>
    );

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar />
        {routes}
      </React.Fragment>
    );
  }
}

export default App;
