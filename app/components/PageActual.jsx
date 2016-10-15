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

      if (drillhole.actualSurvey.length > 0) {
         var newActualPoints = dataAPI.simple(drillhole.collar, drillhole.actualSurvey);
         dispatch(actions.updateDHCoords(drillhole.id, newActualPoints, 'actual'));

         var eoh = drillhole.planSurvey[drillhole.planSurvey.length - 1].depth;
         var lastPoint = newActualPoints.x.length - 1;
         var projectedSurveys = dataAPI.projection('expSmooth', drillhole.actualSurvey, eoh);
         var projectedPoints = dataAPI.simple({
          x: newActualPoints.x[lastPoint],
          y: newActualPoints.y[lastPoint],
          z: newActualPoints.z[lastPoint],
         }, projectedSurveys);
         dispatch(actions.updateDHCoords(drillhole.id, projectedPoints, 'proj'));
      }
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
