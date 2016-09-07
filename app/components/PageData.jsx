import React from 'react';

import TopBar from 'TopBar';

var PageData = React.createClass({
  render: function () {
    return (
      <div className="page-content">
        <TopBar/>
        <p>This will be the data page</p>
      </div>
    )
  }
});

module.exports = PageData;
