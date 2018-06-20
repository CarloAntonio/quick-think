import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './components/AppBar/AppBar';

//Containers
import Welcome from './containers/Welcome/Welcome';
import Game from './containers/Game/Game';

class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path='/game' component={Game} />
        <Route path='/' exact component={Welcome} />
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
