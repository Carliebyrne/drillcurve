import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import Plot from 'Plot';
import PlotInfo from 'PlotInfo';
import TopBar from 'TopBar';

var PageTrace = React.createClass({
  componentWillMount: function () {
    var {drillholes} = this.props;
    if (drillholes.length === 0) {
      browserHistory.push('/blank');
    }
  },
  render: function () {
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
