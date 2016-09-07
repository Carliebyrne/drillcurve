import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

var Main = require('Main');
var PageTrace = require('PageTrace');
var PageData = require('PageData');
var actions = require('actions');

var initialState = {
  userName: 'Jacob',
  company: 'Carvell Labs',
  showCompleted: true,
  drillholes: [
    {
      id: 'DDH001',
      active: true,
      completed: false,
      completedAt: undefined,
      mFromTarget: 10,
      lastSurvey: {
        dip: -20,
        azi: 230
      }
    },
    {
      id: 'DDH002',
      active: false,
      completed: false,
      completedAt: undefined,
      mFromTarget: 15,
      lastSurvey: {
        dip: -50,
        azi: 100
      }
    },
    {
      id: 'DDH003',
      active: false,
      completed: true,
      completedAt: 500,
      mFromTarget: 8,
      lastSurvey: {
        dip: -15,
        azi: 290
      }
    }
  ],
};

var store = require('configureStore').configure(initialState);

console.log(store.getState());
store.subscribe(() => {
    var state = store.getState();
    console.log('New State', state);
});

// App css
require('style!css!purecss/build/pure-min.css');
require('style!css!font-awesome/css/font-awesome.css');
require('style!css!sass!applicationStyle');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="data" component={PageData}/>
        <IndexRoute component={PageTrace}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
