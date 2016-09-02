import React from 'react';

import SideBarHeader from 'SideBarHeader';
import SideBarList from 'SideBarList';
import SideBarFooter from 'SideBarFooter';

var SideBar = React.createClass({
  render: function () {
    var {userName, company, drillholes, showCompleted} = this.props;

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
          <SideBarHeader userName={userName} company={company} />
        </div>
        <div className="sidebar-list-container">
          {renderDrillholes()}
        </div>
        <div>
          <SideBarFooter showCompleted={showCompleted} />
        </div>
      </div>
    )
  }
});

module.exports = SideBar;
