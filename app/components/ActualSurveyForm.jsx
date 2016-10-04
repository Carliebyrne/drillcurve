import React from 'react';
import {connect} from 'react-redux';

var actions = require('actions');

export var ActualSurveyForm = React.createClass({
  componentWillUnmount: function () {
    var {dispatch, drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    dispatch(actions.updateDHCoords(drillhole.id, dataAPI.simple(drillhole.collar, drillhole.planSurvey), 'actual'));
  },
  render: function () {
    var {dispatch, drillhole} = this.props;

    var depthCheck = function (depth) {
      var check = false;
      drillhole.actualSurvey.map((survey) => {
        if (survey.depth == depth) {
          check = true;
        }
      });
      return check;
    };

    return (
      <div className="survey-form">
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <legend>Add New Survey</legend>
            <div className="pure-control-group">
              <label htmlFor="depth">Depth</label>
              <input ref="depth" id="depth" type="number"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="dip">Dip</label>
              <input ref="dip" id="dip" type="number"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="azi">Azimuth</label>
              <input ref="azi" id="azi" type="number"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="temp">Temp</label>
              <input ref="temp" id="temp" type="number"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="mag">Magnetics</label>
              <input ref="mag" id="mag" type="number"/>
            </div>
          </fieldset>
        </form>
        <button type="submit" className="pure-button btn-primary" onClick={() => {
            if (this.refs.depth.value && this.refs.dip.value && this.refs.azi.value && !depthCheck(this.refs.depth.value)) {
              var survey = {depth: this.refs.depth.value, dip: this.refs.dip.value, azi: this.refs.azi.value, temp: this.refs.temp.value, mag: this.refs.mag.value};
              this.refs.depth.value = ""; this.refs.dip.value = ""; this.refs.azi.value = ""; this.refs.temp.value = ""; this.refs.mag.value = "";
              dispatch(actions.addSurvey(drillhole.id, survey, 'actual'));
            }
          }}>Add Survey</button>
      </div>
    )
  }
});

export default connect()(ActualSurveyForm);
