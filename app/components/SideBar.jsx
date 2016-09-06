import React from 'react';

import SideBarHeader from 'SideBarHeader';
import SideBarList from 'SideBarList';
import SideBarFooter from 'SideBarFooter';

export var SideBar = React.createClass({
  render: function () {
    var {dispatch, drillholes} = this.props;

    var renderDrillholes = () => {
      return drillholes.map((drillhole) => {
        return (
          <SideBarList key={drillhole.id} {...drillhole}/>
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
