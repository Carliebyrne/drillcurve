var redux = require('redux');
var {showCompletedReducer, holeReducer, userNameReducer, companyReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    userName: userNameReducer,
    company: companyReducer,
    showCompleted: showCompletedReducer,
    drillholes: holeReducer
  })

  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
