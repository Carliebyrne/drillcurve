import expect from 'expect';
var actions = require('actions');

describe('Actions', () => {
  it('Should generate an ADD_HOLE action', () => {
    var drillhole = [{id: 'DDH001'}];
    var action = {
      type: 'ADD_HOLE',
      drillhole
    };

    var res = actions.addHole(drillhole);
    expect(res).toEqual(action);
  });

  it('Should create a DELETE_HOLE action', () => {
    var action = {
      type: 'DELETE_HOLE',
      id: 'test'
    };

    var res = actions.deleteHole('test');
    expect(res).toEqual(action);
  });

  it('Should generate an UPDATE_HOLE_COORDS action', () => {
    var drillhole = {
      id: 'DDH001',
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0}
    };
    var action = {
      type: 'UPDATE_HOLE_COORDS',
      id: 'DDH001',
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0}
    };

    var res = actions.updateHoleCoords(drillhole.id, drillhole.collar, drillhole.target);
    expect(res).toEqual(action);
  });

  it('Should generate a toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });

  it('Should generate a change active drillhole action', () => {
    var action = {
      type: 'CHANGE_ACTIVE_HOLE',
      id: 'test'
    };
    var res = actions.changeActiveHole('test');
    expect(res).toEqual(action);
  });

  it('Should change the completed status of a drillhole', () => {
    var action = {
      type: 'TOGGLE_COMPLETED',
      id: 'test'
    };
    var res = actions.toggleCompleted('test');
    expect(res).toEqual(action);
  });
});
