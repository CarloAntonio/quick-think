import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './store/reducer';

//App level theme
const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#6abf69',
        main: '#388e3c',
        dark: '#00600f',
        contrastText: '#f5f5f5'
      },
      secondary: {
        light: '#d3b8ae',
        main: '#a1887f',
        dark: '#725b53',
        contrastText: '#ffffff'
      },
    }
  });

const composeEnhancers = 
    process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : null || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
