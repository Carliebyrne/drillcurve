import expect from 'expect';
var reducers = require('reducers');

describe('Reducers', () => {
  describe('Hole Reducer', () => {
    it('Should add a new hole to the state', () => {
      var drillhole = [{id: 'DDH001'}];
      var action = {
        type: 'ADD_HOLE',
        drillhole
      };

      var res = reducers.holeReducer([], action)
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(drillhole[0]);
    });

    it('Should delete the hole from the state', () => {
      var drillhole = [{id: 'DDH001'}];
      var action = {
        type: 'DELETE_HOLE',
        id: drillhole[0].id
      };

      var res = reducers.holeReducer(drillhole, action)
      expect(res.length).toEqual(0);
    });

    it('Should change the active status to the specified holeid', () => {
      var drillholes = [
        {id: 'DDH001', active: false},
        {id: 'DDH002', active: true}
      ];
      var action = {
        type: 'CHANGE_ACTIVE_HOLE',
        id: 'DDH001'
      };

      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].active).toEqual(true);
      expect(res[1].active).toEqual(false);
    });

    it('Should change the completed status to the specified holeid', () => {
      var drillholes = [
        {id: 'DDH001', completed: false}
      ];
      var action = {
        type: 'TOGGLE_COMPLETED',
        id: 'DDH001'
      };

      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].completed).toEqual(true);
    });

    it('Should update the coords of the specified holeid', () => {
      var drillholes = [{
        id: 'DDH001',
        collar: {x: 0, y: 0, z: 0},
        target: {x: 0, y: 0, z: 0, radius: 0}
      }];
      var action = {
        type: 'UPDATE_HOLE_COORDS',
        id: 'DDH001',
        collar: {x: 5, y: 5, z: 5},
        target: {x: 5, y: 5, z: 5, radius: 5}
      };

      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].collar).toEqual(action.collar);
      expect(res[0].target).toEqual(action.target);
    });
  });

  describe('showCompletedReducer', () => {
    it('Should toggle show completed', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(false, action);
      expect(res).toEqual(true);

      var res = reducers.showCompletedReducer(true, action);
      expect(res).toEqual(false);
    });
  });
});
