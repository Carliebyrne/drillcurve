import React from 'react';
import {connect} from 'react-redux';

var actions = require('actions');

export var PlanSurveyForm = React.createClass({
  generateSeries: function () {
    var {dispatch, drillhole} = this.props;
    var metresFrom = parseFloat(this.refs.from.value);
    var metresTo = parseFloat(this.refs.to.value);
    var interval = parseFloat(this.refs.interval.value);
    var startDip = parseFloat(this.refs.startDip.value);
    var startAzi = parseFloat(this.refs.startAzi.value);
    var dipChange = parseFloat(this.refs.dipChange.value);
    var aziChange = parseFloat(this.refs.aziChange.value);
    var newSurveys = [];
    var surveys = drillhole.planSurvey;

    var check = surveys.every((el) => {
      if (el.depth >= metresFrom && el.depth <= metresTo) {
        return false;
      } else {
        return true;
      }
    });

    if (!isNaN(interval) && !isNaN(startDip) && !isNaN(startAzi) && metresTo > metresFrom && check && interval > 0) {
      if (!isNaN(dipChange) && !isNaN(aziChange)) {
        var dipx = 0; var azix = 0;
        for (var i = metresFrom; i <= metresTo; i = i + interval) {
          newSurveys = [
            ...newSurveys,
            {depth: i, dip: startDip + dipx, azi: startAzi + azix}
          ];
          dipx = dipx + dipChange;
          azix = azix + aziChange;
        }
        dispatch(actions.addSeries(drillhole.id, newSurveys, 'plan'));
      } else {
        for (var i = metresFrom; i <= metresTo; i = i + interval) {
          newSurveys = [
            ...newSurveys,
            {depth: i, dip: startDip, azi: startAzi}
          ];
        }
        dispatch(actions.addSeries(drillhole.id, newSurveys, 'plan'));
      }
      this.refs.from.value = ""; this.refs.to.value = ""; this.refs.interval.value = ""; this.refs.startDip.value = "";
      this.refs.startAzi.value = ""; this.refs.dipChange.value = ""; this.refs.aziChange.value = "";
    }

  },
  render: function () {
    var {dispatch, drillhole} = this.props;

    var depthCheck = function (depth) {
      var check = false;
      drillhole.planSurvey.map((survey) => {
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
              <input ref="depth" id="depth" type="number" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="dip">Dip</label>
              <input ref="dip" id="dip" type="number" min="-90" max="90" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="azi">Azimuth</label>
              <input ref="azi" id="azi" type="number" min="0" max="360" step="0.1"/>
            </div>
          </fieldset>
        </form>
        <button type="submit" className="pure-button btn-primary" onClick={() => {
            if (this.refs.depth.value && this.refs.dip.value && this.refs.azi.value && !depthCheck(this.refs.depth.value)) {
              var survey = {depth: parseFloat(this.refs.depth.value), dip: parseFloat(this.refs.dip.value), azi: parseFloat(this.refs.azi.value)};
              this.refs.depth.value = ""; this.refs.dip.value = ""; this.refs.azi.value = "";
              dispatch(actions.addSurvey(drillhole.id, survey, 'plan'));
            }
          }}>Add Survey</button>
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <legend>Add Series</legend>
            <div className="pure-control-group">
              <label htmlFor="from">Add surveys from a depth of</label>
              <input ref="from" id="from" type="number" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="to">to</label>
              <input ref="to" id="to" type="number" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="interval">repeating every</label>
              <input ref="interval" id="interval" type="number" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="startDip">starting at a dip of</label>
              <input ref="startDip" id="startDip" type="number" min="-90" max="90" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="startAzi">and an azimuth of</label>
              <input ref="startAzi" id="startAzi" type="number" min="0" max="360" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="dipChange">with the dip changing</label>
              <input ref="dipChange" id="dipChange" type="number" min="-90" max="90" step="0.1"/>
            </div>
            <div className="pure-control-group">
              <label htmlFor="aziChange">and the azi changing</label>
              <input ref="aziChange" id="aziChange" type="number" min="0" max="360" step="0.1"/>
            </div>
          </fieldset>
        </form>
        <button type="submit" className="pure-button btn-primary" onClick={this.generateSeries}>Add Series</button>
      </div>
    )
  }
});

export default connect()(PlanSurveyForm);
