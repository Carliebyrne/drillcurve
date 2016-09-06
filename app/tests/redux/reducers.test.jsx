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
