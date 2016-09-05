import React from 'react';

var TopBar = React.createClass({
  onClickHandler: function (btnName) {

  },
  render: function () {
    var {id} = this.props;

    return (
      <div className="page-top-bar">
        <div className="topbar-title">
          <h3>{id}</h3>
        </div>
        <div className="flex-right">
          <i className="fa fa-check-circle fa-2x completed" id="toggle-completed"></i>
          <div className="small button-group">
            <a className="button active">Trace</a>
            <a className="button">Data</a>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = TopBar;
