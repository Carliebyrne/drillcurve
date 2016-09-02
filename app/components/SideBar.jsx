var React = require('react');

var SideBarHeader = require('SideBarHeader');
var SideBarList = require('SideBarList');
var SideBarFooter = require('SideBarFooter');

var SideBar = React.createClass({
  getInitialState: function () {
    return {
      userName: 'Jacob',
      company: 'JC Consulting',
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
    var {userName, company, drillholes, showCompleted} = this.state;

    var renderDrillholes = () => {
      return drillholes.map((drillhole) => {
        return (
          <SideBarList key={drillhole.id} {...drillhole}/>
        )
      });
    };

    return (
      <div className="sidebar">
        <div>
          <SideBarHeader userName={userName} company={company} />
        </div>
        <div className="sidebar-list-container">
          {renderDrillholes()}
        </div>
        <div>
          <SideBarFooter showCompleted={showCompleted} />
        </div>
      </div>
    )
  }
});

module.exports = SideBar;
