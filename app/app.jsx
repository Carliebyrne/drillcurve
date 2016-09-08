import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import Main from 'Main';
import PageTrace from 'PageTrace';
import PageData from 'PageData';
import PageEdit from 'PageEdit';
import PageBlank from 'PageBlank';
import PageDataPlan from 'PageDataPlan';
import PageDataActual from 'PageDataActual';

var actions = require('actions');
var demoState = require('DemoState');

var store = require('configureStore').configure(demoState.initialState);

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
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <Route path="data" component={PageData}/>
          <Route path="plan" component={PageDataPlan}/>
          <Route path="actual" component={PageDataActual}/>
        <Route path="edit" component={PageEdit}/>
        <Route path="blank" component={PageBlank}/>
        <IndexRoute component={PageTrace}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
