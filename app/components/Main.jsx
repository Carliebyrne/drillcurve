var React = require('react');

var SideBar = require('SideBar');
var PageContent = require('PageContent');

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <SideBar />
        <PageContent />
      </div>
    )
  }
});

module.exports = Main;
