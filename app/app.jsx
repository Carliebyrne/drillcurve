import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import Main from 'Main';
import PageTrace from 'PageTrace';
import PagePlan from 'PagePlan';
import PageBlank from 'PageBlank';
import PagePlanSurvey from 'PagePlanSurvey';
import PageActual from 'PageActual';
import AppOptions from 'AppOptions';

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
        <Route path="actual" component={PageActual}/>
        <Route path="plan" component={PagePlan}/>
        <Route path="surveys" component={PagePlanSurvey}/>
        <Route path="blank" component={PageBlank}/>
        <Route path="options" component={AppOptions}/>
        <IndexRoute component={PageTrace}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
