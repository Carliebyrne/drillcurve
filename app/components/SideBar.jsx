import React from 'react';
import {connect} from 'react-redux';

import SideBarHeader from 'SideBarHeader';
import SideBarFooter from 'SideBarFooter';
var actions = require('actions');

export var SideBar = React.createClass({
  render: function () {
    var {dispatch, drillholes} = this.props;

    var renderDrillholes = () => {
      return drillholes.map((drillhole) => {
        var activeClass = drillhole.active ? 'sidebar-list active' : 'sidebar-list';
        var id = drillhole.id;
        return (
          <div className={activeClass} key={id} onClick={() => dispatch(actions.changeActiveHole(id))}>
            {id}
          </div>
        )
      });
    };

    return (
      <div className="sidebar">
        <div>
          <SideBarHeader/>
        </div>
        <div className="sidebar-list-container">
          {renderDrillholes()}
        </div>
        <div>
          <SideBarFooter/>
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
)(SideBar);
