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
      case 'UPDATE_DH_COORDS':
        return state.map((drillhole) => {
          if (drillhole.id === action.id) {
            var newCoords = action.points;
            switch (action.option) {
              case 'plan':
                return {
                  ...drillhole,
                  planPoints: newCoords
                };
                break;
              case 'actual':
                return {
                  ...drillhole,
                  actualPoints: newCoords
                };
              break;
            }
          } else {
            return drillhole;
          }
        });
    case 'ADD_SURVEY':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          var newSurvey = action.survey;
          var survey = drillhole.planSurvey;
          var surveyActual = drillhole.actualSurvey;
          switch (action.option) {
            case 'plan':
              return {
                ...drillhole,
                planSurvey: [
                  ...survey,
                  newSurvey
                ]
              };
              break;
            case 'actual':
              return {
                ...drillhole,
                actualSurvey: [
                  ...surveyActual,
                  newSurvey
                ]
              };
              break;
          }
        } else {
          return drillhole;
        }
      });
    case 'ADD_SERIES':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          var newSurvey = action.surveys;
          var survey = newSurvey.concat(drillhole.planSurvey);
          var surveyActual = newSurvey.concat(drillhole.actualSurvey);
          switch (action.option) {
            case 'plan':
              return {
                ...drillhole,
                planSurvey: survey
              };
              break;
            case 'actual':
              return {
                ...drillhole,
                actualSurvey: surveyActual
              };
              break;
          }
        } else {
          return drillhole;
        }
      });
    case 'DELETE_SURVEY':
      return state.map((drillhole) => {
        if (drillhole.id === action.id) {
          switch (action.option) {
            case 'plan':
              var newSurveys = drillhole.planSurvey.filter((survey) => {
                if (survey.depth === action.depth) {
                  return false;
                } else {
                  return true;
                }
              });
              return {
                ...drillhole,
                planSurvey: newSurveys
              }
              break;
            case 'actual':
              var newSurveys = drillhole.actualSurvey.filter((survey) => {
                if (survey.depth === action.depth) {
                  return false;
                } else {
                  return true;
                }
              });
              return {
                ...drillhole,
                actualSurvey: newSurveys
              }
              break;
          }
        } else {
          return drillhole;
        }
      });
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

export var optionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_SURVEY_METHOD':
      switch (action.method) {
         case 'tangent':
            return {
               ...state,
               surveyMethod: {tangent: true, avgAngle: false, minCurve: false}
            }
            break;
         case 'avgAngle':
            return {
               ...state,
               surveyMethod: {tangent: false, avgAngle: true, minCurve: false}
            }
            break;
         case 'minCurve':
            return {
               ...state,
               surveyMethod: {tangent: false, avgAngle: false, minCurve: true}
            }
            break;
      default:
         return state;
      }
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
