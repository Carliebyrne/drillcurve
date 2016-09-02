import React from 'react';

var TopBar = React.createClass({
  render: function () {
    var {pageName} = this.props;

    return (
      <div className="page-top-bar">
        <div className="topbar-title">
          <span className="info badge"><i className="fi-check"></i></span>
          <h3>{pageName}</h3>
          <div className="small button-group">
            <a className="button">Trace</a>
            <a className="button">Data</a>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = TopBar;
