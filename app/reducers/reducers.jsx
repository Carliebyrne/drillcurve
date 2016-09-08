import uuid from 'node-uuid';
import moment from 'moment';

export var holeReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOLE':
      return [
        ...state,
        ...action.drillhole
      ];
    case 'DELETE_HOLE':
      return state.filter((drillhole) => {
        if (drillhole.id === action.id) {
          return false;
        } else {
          return true;
        }
      });
    case 'UPDATE_HOLE_COORDS':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          var newCollar = action.collar;
          var newTarget = action.target;
          return {
            ...drillhole,
            collar: newCollar,
            target: newTarget
          };
        } else {
          return drillhole;
        }
      });
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
    case 'CHANGE_ACTIVE_HOLE':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          return {
            ...drillhole,
            active: true
          };
        } else {
          return {
            ...drillhole,
            active: false
          };
        }
      });
    case 'TOGGLE_COMPLETED':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          var nextCompleted = !drillhole.completed;
          return {
            ...drillhole,
            completed: nextCompleted,
            completedAt: nextCompleted ? moment().unix() : undefined
          }
        } else {
          return drillhole;
        }
      });
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

export var userNameReducer = (state = 'guest', action) => {
  return state;
};

export var companyReducer = (state = 'Carvell Labs', action) => {
  return state;
};
