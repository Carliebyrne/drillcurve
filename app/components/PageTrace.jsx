import React from 'react';
import Plot from 'Plot';
import PlotInfo from 'PlotInfo';
import TopBar from 'TopBar';

var PageContent = React.createClass({
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

module.exports = PageContent;
