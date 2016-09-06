import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

var Main = require('Main');
var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
    var state = store.getState();
    console.log('New State', state);
});

// App css
require('style!css!font-awesome/css/font-awesome.css');
require('style!css!sass!applicationStyle');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
