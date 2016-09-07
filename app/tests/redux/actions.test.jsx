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
