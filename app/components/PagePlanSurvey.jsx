import React from 'react';
import {connect} from 'react-redux';

import TopBar from 'TopBar';
import PlanSurveyForm from 'PlanSurveyForm';
var actions = require('actions');

export var PagePlanSurvey = React.createClass({
  render: function () {
    var {dispatch, drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    var renderPlanSurveys = () => {
      drillhole.planSurvey.sort((a, b) => {return a.depth - b.depth});
      return drillhole.planSurvey.map((survey) => {
        return (
          <tr key={survey.depth}>
            <td>{survey.depth}</td>
            <td>{survey.dip}</td>
            <td>{survey.azi}</td>
            <td key={survey.depth} className="delete-survey" onClick={() => {
                dispatch(actions.deleteSurvey(drillhole.id, survey.depth, 'plan'));
              }}><i className="fa fa-times"></i></td>
          </tr>
        );
      });
    };

    return (
      <div className="page-content">
        <TopBar/>
        <div className="survey-data-form">
          <PlanSurveyForm drillhole={drillhole}/>
          <div className="plan-survey survey-margin">
            <table className="pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th>Depth</th>
                  <th>Dip</th>
                  <th>Azimuth</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {renderPlanSurveys()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      drillholes: state.drillholes
    }
  }
)(PagePlanSurvey);
