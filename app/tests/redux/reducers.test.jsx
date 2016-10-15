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

    it('Should update the target box coords of the holeid', () => {
      var drillholes = [{
        id: 'DDH001',
        targetBox: {
           x: [0, 0, 0, 0],
           y: [0, 0, 0, 0],
           z: [0, 0, 0, 0]
       }
      }];
      var action = {
        type: 'UPDATE_TARGET_COORDS',
        id: 'DDH001',
        targetBox: {
           x: [1, 1, 1, 1],
           y: [1, 1, 1, 1],
           z: [1, 1, 1, 1]
       }
      };

      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].targetBox).toEqual(action.targetBox);
    });

    it('Should update the points of the specified holeid', () => {
      var drillholes = [{
        id: 'DDH001',
        planPoints: {x: [0], y: [0], z: [0]},
        actualPoints: {x: [0], y: [0], z: [0]}
      }];
      var action = {
        type: 'UPDATE_DH_COORDS',
        id: 'DDH001',
        points: {x: [1,1], y: [1,1], z: [1,1]},
        option: 'plan'
      };

      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].planPoints).toEqual(action.points);

      action.option = 'actual';
      var res = reducers.holeReducer(drillholes, action)
      expect(res[0].actualPoints).toEqual(action.points);

    });

    it('Should add a survey to the specified holeid', () => {
      var drillholes = [{
        id: 'DDH001',
        planSurvey: [],
        actualSurvey: []
      }];
      var actionPlan = {
        type: 'ADD_SURVEY',
        id: 'DDH001',
        survey: {depth: 0, dip: 0, azi: 0},
        option: 'plan'
      };
      var actionActual = {
        type: 'ADD_SURVEY',
        id: 'DDH001',
        survey: {depth: 0, dip: 0, azi: 0, temp: 0, mag: 0},
        option: 'actual'
      };

      var res = reducers.holeReducer(drillholes, actionPlan)
      expect(res[0].planSurvey).toEqual([{depth: 0, dip: 0, azi: 0}]);
      var res = reducers.holeReducer(drillholes, actionActual)
      expect(res[0].actualSurvey).toEqual([{depth: 0, dip: 0, azi: 0, temp: 0, mag: 0}]);
    });

    it('Should add a series of surveys to the specified holeid', () => {
      var surveys = [{depth: 0, dip: 0, azi: 0}, {depth: 30, dip: 0, azi: 0}];
      var drillholes = [{
        id: 'DDH001',
        planSurvey: [],
        actualSurvey: []
      }];
      var actionPlan = {
        type: 'ADD_SERIES',
        id: 'DDH001',
        surveys: surveys,
        option: 'plan'
      };
      var actionActual = {
        type: 'ADD_SERIES',
        id: 'DDH001',
        surveys: surveys,
        option: 'actual'
      };

      var res = reducers.holeReducer(drillholes, actionPlan)
      expect(res[0].planSurvey).toEqual(surveys);
      var res = reducers.holeReducer(drillholes, actionActual)
      expect(res[0].actualSurvey).toEqual(surveys);
    });

    it('Should delete the survey of the specified holeid', () => {
      var drillholes = [{
        id: 'DDH001',
        planSurvey: [{depth: 0, dip: 0, azi: 0, azi: 0, temp: 0, mag: 0}],
        actualSurvey: [{depth: 30, dip: 0, azi: 0, azi: 0, temp: 0, mag: 0}]
      }];
      var actionPlan = {
        type: 'DELETE_SURVEY',
        id: 'DDH001',
        depth: 0,
        option: 'plan'
      };
      var actionActual = {
        type: 'DELETE_SURVEY',
        id: 'DDH001',
        depth: 30,
        option: 'actual'
      };

      var res = reducers.holeReducer(drillholes, actionPlan)
      expect(res[0].planSurvey).toEqual([]);
      var res = reducers.holeReducer(drillholes, actionActual)
      expect(res[0].actualSurvey).toEqual([]);
    });
  });

  describe('optionsReducer', () => {
    it('Should change the survey method', () => {
      var options: {
          surveyMethod: {
             tangent: false,
             avgAngle: false,
             minCurve: true
          }
      };
      var action = {
        type: 'CHANGE_SURVEY_METHOD',
        method: 'tangent'
      };

      var res = reducers.optionsReducer(options, action);
      expect(res.surveyMethod.tangent).toEqual(true);
      expect(res.surveyMethod.avgAngle).toEqual(false);
      expect(res.surveyMethod.minCurve).toEqual(false);

      action.method = 'avgAngle';
      res = reducers.optionsReducer(options, action);
      expect(res.surveyMethod.tangent).toEqual(false);
      expect(res.surveyMethod.avgAngle).toEqual(true);
      expect(res.surveyMethod.minCurve).toEqual(false);
    });
    it('Should change the projection method', () => {
      var options: {
          projectionMethod: {
             lastValue: false,
             movAvg: false,
             expSmooth: true
          }
      };
      var action = {
        type: 'CHANGE_PROJECTION_METHOD',
        method: 'movAvg'
      };

      var res = reducers.optionsReducer(options, action);
      expect(res.projectionMethod.lastValue).toEqual(false);
      expect(res.projectionMethod.movAvg).toEqual(true);
      expect(res.projectionMethod.expSmooth).toEqual(false);

      action.method = 'lastValue';
      res = reducers.optionsReducer(options, action);
      expect(res.projectionMethod.lastValue).toEqual(true);
      expect(res.projectionMethod.movAvg).toEqual(false);
      expect(res.projectionMethod.expSmooth).toEqual(false);
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
