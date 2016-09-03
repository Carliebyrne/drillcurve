import React from 'react';
import Plot from 'Plot';

var PageContent = React.createClass({
  render: function () {
    return (
      <div className="page-content">
        <Plot/>
      </div>
    )
  }
});

module.exports = PageContent;
