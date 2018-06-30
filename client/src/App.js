import React, { Component } from 'react';
import './App.css';
import './assets/css/material.min.css';
import './assets/js/material.min.js';
import Home from './components/home';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';;

const store = createStore(
  allReducers,
  applyMiddleware(thunkMiddleware, logger)
);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
