import React from 'react';
var {connect} = require('react-redux');
var actions = require('actions');

export var SideBarFooter = React.createClass({
  render: function () {
    var {dispatch, showCompleted} = this.props;

    return (
      <div className="sidebar-footer">
        <form>
          <label className="show-completed">
            <input type="checkbox" checked={showCompleted} onChange={() => dispatch(actions.toggleShowCompleted())}/>
            Show Completed
          </label>
        </form>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted
    }
  }
)(SideBarFooter);
