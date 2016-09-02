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
        {id: 'DDH001'},
        {id: 'DDH002'},
        {id: 'DDH003'},
        {id: 'DDH004'}
      ],
      showCompleted: true
    }
  },
  render: function () {
    var {userName, company, pageName, drillholes, showCompleted} = this.state;

    return (
      <div className="wrapper">
        <SideBar userName={userName} company={company} drillholes={drillholes} showCompleted={showCompleted}/>
        <div className="main-page">
          <TopBar pageName={pageName}/>
          <PageContent/>
        </div>
      </div>
    )
  }
});

module.exports = Main;