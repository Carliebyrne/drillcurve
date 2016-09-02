var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var Main = require('Main');

//Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyle')

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
