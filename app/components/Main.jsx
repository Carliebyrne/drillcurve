var React = require('react');

var SideBar = require('SideBar');
var PageContent = require('PageContent');
var TopBar = require('TopBar');

var Main = React.createClass({
  render: function () {
    var {userName, company, pageName, drillholes, showCompleted} = this.state;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    return (
      <div className="wrapper">
        <SideBar userName={userName} company={company} drillholes={drillholes}/>
        <div className="main-page">
          <TopBar id={drillhole.id} onSetView={this.handleViewChange}/>
          <PageContent pageName={pageName} drillhole={drillhole}/>
        </div>
      </div>
    )
  }
});

module.exports = Main;
