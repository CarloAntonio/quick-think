import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './App.css';

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
      <div className={classes.App}>
        {routes}
      </div>
    );
  }
}

export default App;
