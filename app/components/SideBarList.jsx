import React from 'react';

var SideBarList = React.createClass({
  render: function () {
    var {id, active} = this.props;
    var activeClass = active ? 'sidebar-list active' : 'sidebar-list';

    return (
      <div className={activeClass}>
        {id}
      </div>
    )
  }
});

module.exports = SideBarList;
