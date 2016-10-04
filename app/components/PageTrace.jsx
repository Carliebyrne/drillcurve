import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import Plot from 'Plot';
import PlotInfo from 'PlotInfo';
import TopBar from 'TopBar';
import dataAPI from 'dataAPI';

var PageTrace = React.createClass({
  componentWillMount: function () {
    var {drillholes} = this.props;
    if (drillholes.length === 0) {
      browserHistory.push('/blank');
    }
  },
  render: function () {
    var {drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    console.log(dataAPI.simple(drillhole.collar, drillhole.planSurvey));

    return (
      <div className="page-content">
        <TopBar/>
        <Plot/>
        <PlotInfo/>
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
)(PageTrace);
