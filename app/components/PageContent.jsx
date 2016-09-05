import React from 'react';
import Plot from 'Plot';
import PlotInfo from 'PlotInfo';
import HoleData from 'HoleData';

var PageContent = React.createClass({
  render: function () {
    var {drillhole, pageName} = this.props;

    var page = (pageName) => {
      switch (pageName) {
        case 'Drillhole View':
          return (
            <div>
              <Plot/>
              <PlotInfo drillhole={drillhole}/>
            </div>
          )
          break;
        case 'Data View':
          return (
            <div>
              <HoleData/>
            </div>
          )
        default:
          return (
            <div>
              <Plot/>
              <PlotInfo drillhole={drillhole}/>
            </div>
          )
      }
    };

    return (
      <div className="page-content">
        {page()}
      </div>
    )
  }
});

module.exports = PageContent;
