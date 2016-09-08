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
    var {drillholes} = this.props;

    var renderComponents = () => {
      if (drillholes.length === 0) {
        this.componentWillMount();
      } else {
        return (
          <div>
            <TopBar/>
            <Plot/>
            <PlotInfo/>
          </div>
        )
      }
    }

    return (
      <div className="page-content">
        {renderComponents()}
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
