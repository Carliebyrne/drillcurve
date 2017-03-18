var React = require('react');
var {connect} = require('react-redux');

export var PlotInfo = React.createClass({
  componentWillMount: function () {
    var {drillholes} = this.props;
    if (typeof drillholes === 'undefined' || drillholes.length === 0) {
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
    var lastSurvey = drillhole.actualSurvey[drillhole.actualSurvey.length - 1];

    return (
      <div className="plot-info">
        <h3>Drillhole Information</h3>
        <p>The drillhole is {drillhole.mFromTarget}m from the target.</p>
        <p>Last survey had a dip of {lastSurvey.dip} and an azimuth of {lastSurvey.azi}</p>
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
)(PlotInfo);
