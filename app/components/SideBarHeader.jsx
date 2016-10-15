import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export var SideBarHeader = React.createClass({
  render: function () {
    var {userName, company} = this.props;

    return (
      <div className="sidebar-header">
        <div className="active-dot"></div>
        <img src="img/rabbithole-square.png" alt="rabbithole" height="50" width="auto" className="logo-image"/>
        <div className="user-details">
          <p>{userName}</p>
          <p>{company}</p>
        </div>
        <div className="options-menu-btn" onClick={() => {browserHistory.push('/options')}}></div>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      userName: state.userName,
      company: state.company
    }
  }
)(SideBarHeader);
