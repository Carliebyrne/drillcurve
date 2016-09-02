import React from 'react';

var SideBarHeader = React.createClass({
  render: function () {
    var {userName, company} = this.props;

    return (
      <div className="sidebar-header">
        <div className="active-dot"></div>
        <div className="user-details">
          <p>{userName}</p>
          <p>{company}</p>
        </div>
        <div className="options-menu-btn"></div>
      </div>
    )
  }
});

module.exports = SideBarHeader;
