import uuid from 'node-uuid';
//import moment from 'moment';

export var holeReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOLE':
      return [
        ...state,
        ...action.drillhole
      ];
    case 'ADD_SURVEY':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          var newSurvey = action.survey;
          return {
            ...drillhole,
            surveys: {
              ...surveys,
              newSurvey
            }
          };
        } else {
          return drillhole;
        }
      });

    case 'REMOVE_SURVEY':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          drillhole.surveys.filter((survey) => {
            if (survey.depth === action.depth) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          return drillhole;
        }
      })
    default:
      return state;
  }
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};
