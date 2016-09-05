import React from 'react';
import Plot from 'Plot';
import PlotInfo from 'PlotInfo';

var PageContent = React.createClass({
  render: function () {
    var {drillhole} = this.props;

    return (
      <div className="page-content">
        <Plot/>
        <PlotInfo drillhole={drillhole}/>
      </div>
    )
  }
});

module.exports = PageContent;
