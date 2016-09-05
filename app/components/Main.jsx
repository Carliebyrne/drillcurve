var React = require('react');

var SideBar = require('SideBar');
var PageContent = require('PageContent');
var TopBar = require('TopBar');

var Main = React.createClass({
  getInitialState: function () {
    return {
      userName: 'Jacob',
      company: 'JC Consulting',
      pageName: 'Drillhole View',
      drillholes: [
        {
          id: 'DDH001',
          active: true,
          mFromTarget: 10,
          lastSurvey: {
            dip: -20,
            azi: 230
          }
        },
        {
          id: 'DDH002',
          active: false,
          mFromTarget: 15,
          lastSurvey: {
            dip: -50,
            azi: 100
          }
        },
        {
          id: 'DDH003',
          active: false,
          mFromTarget: 8,
          lastSurvey: {
            dip: -15,
            azi: 290
          }
        },
        {
          id: 'DDH004',
          active: false,
          mFromTarget: 2,
          lastSurvey: {
            dip: -55,
            azi: 250
          }
        }
      ],
      showCompleted: true
    }
  },
  render: function () {
    var {userName, company, pageName, drillholes, showCompleted} = this.state;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    return (
      <div className="wrapper">
        <SideBar userName={userName} company={company} drillholes={drillholes} showCompleted={showCompleted}/>
        <div className="main-page">
          <TopBar id={drillhole.id} onSetView={this.handleViewChange}/>
          <PageContent pageName={pageName} drillhole={drillhole}/>
        </div>
      </div>
    )
  }
});

module.exports = Main;
