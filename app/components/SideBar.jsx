import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import moment from 'moment';

import SideBarHeader from 'SideBarHeader';
import SideBarFooter from 'SideBarFooter';
var actions = require('actions');

export var SideBar = React.createClass({
  getInitialState: function () {
    return {editStatus: false};
  },
  handleClick: function () {
    if (this.state.editStatus === false) {
      this.setState({editStatus: true});
    }
  },
  handleLoseFocus: function () {
    if (this.state.editStatus === true) {
      this.setState({editStatus: false});
    }
  },
  onSubmit: function (e) {
    e.preventDefault();
    var {dispatch, drillholes} = this.props;
    var newID = this.refs.newID.value;

    var doesExist = drillholes.map((drillhole) => {
      if (drillhole.id == newID) {
        return true;
      } else {
        return false;
      }
    });

    if (!doesExist.includes(true)) {
      var newDrillhole = [{
        id: newID,
        active: false,
        created: moment().unix(),
        completed: false,
        completedAt: undefined,
        mFromTarget: undefined,
        collar: {x: 0, y: 0, z: 0},
        target: {x: 0, y: 0, z: 0, radius: 0},
        planSurvey: [{depth: 0, dip: 0, azi: 0}],
        actualSurvey: [{depth: 0, dip: 0, temp: 0, mag: 0}],
        planPoints: {x: [0], y: [0], z: [0]},
        actualPoints: {x: [0], y: [0], z: [0]}
      }];
      dispatch(actions.addHole(newDrillhole));
      dispatch(actions.changeActiveHole(newID));
      this.setState({editStatus: false});
      browserHistory.push('/edit');
    }

  },
  componentDidUpdate: function () {
    if (ReactDOM.findDOMNode(this.refs.newID)) {
      ReactDOM.findDOMNode(this.refs.newID).focus();
    }
  },
  render: function () {
    var {dispatch, drillholes, showCompleted} = this.props;
    var {editStatus} = this.state;

    var renderDrillholes = () => {
      if (typeof drillholes === 'undefined' || Object.keys(drillholes).length === 0) {
        return <div></div>
      } else {
        return drillholes.map((drillhole) => {
          var activeClass = drillhole.active ? 'sidebar-list active' : 'sidebar-list';
          var id = drillhole.id;
          if (showCompleted) {
            return (
              <div className={activeClass} key={id} onClick={() => dispatch(actions.changeActiveHole(id))}>
                {id}
              </div>
            )
          } else if (!showCompleted && !drillhole.completed) {
            return (
              <div className={activeClass} key={id} onClick={() => dispatch(actions.changeActiveHole(id))}>
                {id}
              </div>
            )
          }
        });
      }
    };

    var renderNewHole = () => {
      if (editStatus) {
        return (
          <form onSubmit={this.onSubmit}>
            <input ref="newID" type="text" onBlur={() => {this.handleLoseFocus()}}/>
          </form>
        )
      } else {
        return <div><i className="fa fa-plus"></i> Add New Drillhole</div>
      }
    }

    return (
      <div className="sidebar">
        <div>
          <SideBarHeader/>
        </div>
        <div className="sidebar-list-container">
          {renderDrillholes()}
          <div className="new-drillhole" onClick={() => {this.handleClick()}}>
            {renderNewHole()}
          </div>
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
      showCompleted: state.showCompleted,
      drillholes: state.drillholes
    }
  }
)(SideBar);
