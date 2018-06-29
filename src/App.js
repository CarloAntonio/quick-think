import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

//Containers
import Welcome from './containers/Welcome/Welcome';
import Game from './containers/Game/Game';
import Login from './containers/Login/Login';
import Layout from './containers/Layout/Layout';

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
        <Layout>
          {routes}
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
