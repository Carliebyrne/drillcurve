import React from 'react';
import TopBar from 'TopBar';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

var actions = require('actions');

var AppOptions = React.createClass({
  render: function () {
    var {dispatch, options} = this.props;

    return (
      <div className="page-content">
         <div className="page-top-bar">
            <div className="topbar-title">
               <h1>Options</h1>
            </div>
            <div className="flex-right">
               <div className="close-menu-btn" onClick={() => {browserHistory.push('/')}}><i className="fa fa-times"></i></div>
            </div>
         </div>
         <div className="options">
            <form className="pure-form pure-form-aligned">
               <fieldset className="form-gap">
                  <legend>Desurveying Method</legend>
                  <p>This is the method used to generate the points in 3d space from the survey data. The most accurate method is the minimum curvature method and it is the recommended setting for this field.</p>
                  <label htmlFor="tangent" className="pure-radio">
                     <input id="tangent" type="radio" name="desurvey" value="tangent" checked={options.surveyMethod.tangent} onClick={() => {dispatch(actions.changeSurveyMethod('tangent'))}} readOnly/>
                     Tangential Method
                  </label>
                  <label htmlFor="avg-angle" className="pure-radio">
                     <input id="avg-angle" type="radio" name="desurvey" value="avg-angle" checked={options.surveyMethod.avgAngle} onClick={() => {dispatch(actions.changeSurveyMethod('avgAngle'))}} readOnly/>
                     Average Angle Method
                  </label>
                  <label htmlFor="min-curve" className="pure-radio">
                     <input id="min-curve" type="radio" name="desurvey" value="min-curve" checked={options.surveyMethod.minCurve} onClick={() => {dispatch(actions.changeSurveyMethod('minCurve'))}} readOnly/>
                     Minimum Curvature Method
                  </label>
               </fieldset>

               <fieldset className="form-gap">
                  <legend>Projection Method</legend>
                  <p>This is the default method used to generate the points projected past the actual surveys.</p>
                  <label htmlFor="lastValue" className="pure-radio">
                     <input id="lastValue" type="radio" name="projection" value="lastValue" checked={options.projectionMethod.lastValue} onClick={() => {dispatch(actions.changeProjectionMethod('lastValue'))}} readOnly/>
                     Last Value
                  </label>
                  <label htmlFor="movAvg" className="pure-radio">
                     <input id="movAvg" type="radio" name="projection" value="movAvg" checked={options.projectionMethod.movAvg} onClick={() => {dispatch(actions.changeProjectionMethod('movAvg'))}} readOnly/>
                     Moving Average
                  </label>
                  <label htmlFor="expSmooth" className="pure-radio">
                     <input id="expSmooth" type="radio" name="projection" value="expSmooth" checked={options.projectionMethod.expSmooth} onClick={() => {dispatch(actions.changeProjectionMethod('expSmooth'))}} readOnly/>
                     Exponential Smoothing
                  </label>
               </fieldset>
            </form>
         </div>
      </div>
    )
  }
});

export default connect(
   (state) => {
      return {
         options: state.options
      };
   }
)(AppOptions);
