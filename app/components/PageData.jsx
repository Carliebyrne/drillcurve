import React from 'react';

import TopBar from 'TopBar';
import PageDataPlan from 'PageDataPlan';
import PageDataActual from 'PageDataActual';

export var PageData = React.createClass({
  render: function () {
    return (
      <div className="page-content">
        <TopBar dataPage="true"/>
        <PageDataPlan/>
      </div>
    )
  }
});

export default (PageData);
