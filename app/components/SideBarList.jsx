import React from 'react';

var SideBarList = React.createClass({
  render: function () {
    var {id} = this.props;

    return (
      <div className="sidebar-list">
        {id}
      </div>
    )
  }
});

module.exports = SideBarList;
