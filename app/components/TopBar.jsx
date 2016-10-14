import React from 'react';
import {connect} from 'react-redux';
import {Router, Link, IndexLink} from 'react-router';
import {browserHistory} from 'react-router';

var actions = require('actions');

export var TopBar = React.createClass({
  componentWillMount: function () {
    var {drillholes} = this.props;
    if (drillholes.length === 0) {
      browserHistory.push('/blank');
    }
  },
  render: function () {
    var {dispatch, drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    return (
      <div className="page-top-bar">
        <div className="topbar-title">
          <h1>{drillhole.id}</h1>
        </div>
        <div className="flex-right">
          <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
                <li className="pure-menu-item">
                  <label className="hole-completed">
                    <input type="checkbox" checked={drillhole.completed} onChange={() => dispatch(actions.toggleCompleted(drillhole.id))}/>
                    Completed
                  </label>
                </li>
                <li className="pure-menu-item"><IndexLink to="/" activeClassName="active-link" className="pure-menu-link">Trace</IndexLink></li>
                <li className="pure-menu-item"><Link to="/actual" activeClassName="active-link" className="pure-menu-link">Actual</Link></li>
                <li className="pure-menu-item"><Link to="/surveys" activeClassName="active-link" className="pure-menu-link">Plan</Link></li>
                <li className="pure-menu-item"><Link to="/plan" activeClassName="active-link" className="pure-menu-link">Collar</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      drillholes: state.drillholes
    }
  }
)(TopBar);
