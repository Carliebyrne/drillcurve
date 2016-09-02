import React from 'react';

var SideBar = React.createClass({
  render: function () {
    var {showCompleted} = this.props;

    return (
      <div className="sidebar-footer">
        <form>
          <label>
          <input type="checkbox" checked={showCompleted} />
          Show Completed</label>
        </form>
      </div>
    )
  }
});

module.exports = SideBar;
