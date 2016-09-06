import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

var Main = require('Main');
var actions = require('actions');

var initialState = {
  userName: 'Jacob',
  company: 'JC Consulting',
  pageName: 'Drillhole View',
  drillholes: [
    {
      id: 'DDH001',
      active: true,
      mFromTarget: 10,
      lastSurvey: {
        dip: -20,
        azi: 230
      }
    },
    {
      id: 'DDH002',
      active: false,
      mFromTarget: 15,
      lastSurvey: {
        dip: -50,
        azi: 100
      }
    },
    {
      id: 'DDH003',
      active: false,
      mFromTarget: 8,
      lastSurvey: {
        dip: -15,
        azi: 290
      }
    },
    {
      id: 'DDH004',
      active: false,
      mFromTarget: 2,
      lastSurvey: {
        dip: -55,
        azi: 250
      }
    }
  ],
  showCompleted: true
};

var store = require('configureStore').configure(initialState);

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
