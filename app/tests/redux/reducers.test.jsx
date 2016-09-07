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
        {id: 'DDH001', completed: false},
        {id: 'DDH002', completed: true}
      ];
      var action = {
        type: 'TOGGLE_COMPLETED',
        id: 'DDH001'
      };

      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].completed).toEqual(true);
      expect(res[1].completed).toEqual(false);
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
