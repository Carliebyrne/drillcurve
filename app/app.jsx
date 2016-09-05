import React from 'react';
import ReactDOM from 'react-dom';

var Main = require('Main');

//Load foundation
$(document).foundation();

// App css
require('style!css!font-awesome/css/font-awesome.css');
require('style!css!sass!applicationStyle');

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
