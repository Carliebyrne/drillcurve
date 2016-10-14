import React from 'react';
import {connect} from 'react-redux';

import TopBar from 'TopBar';
import ActualSurveyForm from 'ActualSurveyForm';
import dataAPI from 'dataAPI';
var actions = require('actions');

export var PageActual = React.createClass({
   componentWillUnmount: function () {
     var {dispatch, drillholes} = this.props;
     var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
         return true;
      }
     })[0];

     dispatch(actions.updateDHCoords(drillhole.id, dataAPI.simple(drillhole.collar, drillhole.actualSurvey), 'actual'));
     var eoh = drillhole.planSurvey[drillhole.planSurvey.length - 1].depth;
     var lastPoint = drillhole.actualPoints.x.length - 1;
     var projectedSurveys = dataAPI.projection('expSmooth', drillhole.actualSurvey, eoh);
     var projectedPoints = dataAPI.simple({
        x: drillhole.actualPoints.x[lastPoint],
        y: drillhole.actualPoints.y[lastPoint],
        z: drillhole.actualPoints.z[lastPoint],
     }, projectedSurveys);
     console.log(projectedSurveys);
     console.log(projectedPoints);

   },
  render: function () {
    var {dispatch, drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    var renderActualSurveys = () => {
      drillhole.actualSurvey.sort((a, b) => {return a.depth - b.depth});
      return drillhole.actualSurvey.map((survey) => {
        return (
          <tr key={survey.depth}>
            <td>{survey.depth}</td>
            <td>{survey.dip}</td>
            <td>{survey.azi}</td>
            <td>{survey.temp}</td>
            <td>{survey.mag}</td>
            <td key={survey.depth} className="delete-survey" onClick={() => {
                dispatch(actions.deleteSurvey(drillhole.id, survey.depth, 'actual'))
              }}><i className="fa fa-times"></i></td>
          </tr>
        )
      });
    };

    return (
      <div className="page-content">
        <TopBar/>
        <div className="survey-data-form">
          <ActualSurveyForm drillhole={drillhole}/>
          <div className="actual-survey survey-margin">
            <h2>Actual Surveys</h2>
            <table className="pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th>Depth</th>
                  <th>Dip</th>
                  <th>Azimuth</th>
                  <th>Temperature</th>
                  <th>Magnetics</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {renderActualSurveys()}
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
)(PageActual);
