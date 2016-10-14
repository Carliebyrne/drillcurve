import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Modal from 'react-modal';

import TopBar from 'TopBar';
var actions = require('actions');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export var PagePlan = React.createClass({
   getInitialState: function() {
     return {modalIsOpen: false};
   },
   openModal: function() {
     this.setState({modalIsOpen: true});
   },
   afterOpenModal: function() {
     // references are now sync'd and can be accessed.
     this.refs.subtitle.style.color = '#f00';
   },
   closeModal: function() {
     this.setState({modalIsOpen: false});
   },
   onSubmit: function (e) {
    e.preventDefault();
    var {dispatch, drillholes} = this.props;

    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    var newCollar = {x: this.refs.x.value, y: this.refs.y.value, z: this.refs.z.value};
    var newTarget = {x: this.refs.tx.value, y: this.refs.ty.value, z: this.refs.tz.value, radius: this.refs.radius.value};

    dispatch(actions.updateHoleCoords(drillhole.id, newCollar, newTarget));
   },
   deleteHole: function (e) {
   e.preventDefault();
   this.closeModal();

   var {dispatch, drillholes} = this.props;

   var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
   })[0];

   if (drillholes.length > 1) {
      if (drillholes[0].id === drillhole.id) {
        dispatch(actions.changeActiveHole(drillholes[1].id));
      } else {
        dispatch(actions.changeActiveHole(drillholes[0].id));
      }
      dispatch(actions.deleteHole(drillhole.id));
   } else {
      browserHistory.push('/blank');
      dispatch(actions.deleteHole(drillhole.id));
   }
   },
  render: function () {
    var {drillholes} = this.props;

    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    return (
      <div className="page-content zero-index">
        <TopBar/>
           <Modal
             isOpen={this.state.modalIsOpen}
             onAfterOpen={this.afterOpenModal}
             onRequestClose={this.closeModal}
             style={customStyles} >
             <p className="modal-text">Are you sure you want to delete this hole?</p>
             <button className="pure-button btn-primary" onClick={this.closeModal}>No</button>
             <button className="pure-button btn-warning" onClick={this.deleteHole}>Yes</button>
           </Modal>
        <div className="new-hole-form">
          <form className="pure-form pure-form-aligned">
            <fieldset>
              <legend>Collar Co-ordinates</legend>
              <div className="pure-control-group">
                <label htmlFor="x">Easting</label>
                <input ref="x" id="x" type="number" defaultValue={drillhole.collar.x}/>
              </div>

              <div className="pure-control-group">
                <label htmlFor="y">Northing</label>
                <input ref="y" id="y" type="number" defaultValue={drillhole.collar.y}/>
              </div>

              <div className="pure-control-group">
                <label htmlFor="z">Elevation</label>
                <input ref="z" id="z" type="number" defaultValue={drillhole.collar.z}/>
              </div>
            </fieldset>

            <fieldset>
              <legend>Target Point Co-ordinates</legend>
              <div className="pure-control-group">
                <label htmlFor="x">Easting</label>
                <input ref="tx" id="tx" type="number" defaultValue={drillhole.target.x}/>
              </div>

              <div className="pure-control-group">
                <label htmlFor="y">Northing</label>
                <input ref="ty" id="ty" type="number" defaultValue={drillhole.target.y}/>
              </div>

              <div className="pure-control-group">
                <label htmlFor="z">Elevation</label>
                <input ref="tz" id="tz" type="number" defaultValue={drillhole.target.z}/>
              </div>

              <div className="pure-control-group">
                <label htmlFor="radius">Box Size</label>
                <input ref="radius" id="radius" type="number" defaultValue={drillhole.target.radius}/>
              </div>
            </fieldset>
          </form>
          <div className="form-buttons">
            <button type="submit" className="pure-button btn-primary" onClick={this.onSubmit}>Save</button>
            <button type="submit" className="pure-button btn-warning" onClick={this.openModal}>Delete Hole</button>
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
)(PagePlan);
