var redux = require('redux');
var {showCompletedReducer, holeReducer, userNameReducer, companyReducer, optionsReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    userName: userNameReducer,
    company: companyReducer,
    showCompleted: showCompletedReducer,
    options: optionsReducer,
    drillholes: holeReducer
  })

  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
