import React from 'react';

var TopBar = React.createClass({
  render: function () {
    var {pageName} = this.props;

    return (
      <div className="page-top-bar">
        <div className="topbar-title">

          <h3>{pageName}</h3>
        </div>
        <span className="info badge"><i className="fa fa-check"></i></span>
        <div className="small button-group">
          <a className="button">Trace</a>
          <a className="button">Data</a>
        </div>
      </div>
    )
  }

});

module.exports = TopBar;
