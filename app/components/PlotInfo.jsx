var React = require('react');

var PlotInfo = React.createClass({
  render: function () {
    var {drillhole} = this.props;

    return (
      <div className="plot-info">
        <h5>Drillhole Information</h5>
        <p>The drillhole is {drillhole.mFromTarget}m from the target.</p>
        <p>Last survey had a dip of {drillhole.lastSurvey.dip} and an azimuth of {drillhole.lastSurvey.azi}</p>
      </div>
    )
  }
});

module.exports = PlotInfo;
