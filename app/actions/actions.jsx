export var addHole = (drillhole) => {
    return {
      type: 'ADD_HOLE',
      drillhole
    }
};

export var deleteHole = (id) => {
    return {
      type: 'DELETE_HOLE',
      id
    }
};

export var updateHoleCoords = (id, collar, target) => {
  return {
    type: 'UPDATE_HOLE_COORDS',
    id,
    collar,
    target
  }
};

export var changeActiveHole = (id) => {
  return {
    type: 'CHANGE_ACTIVE_HOLE',
    id
  }
};

export var addSurvey = (id, survey, option) => {
  return {
    type: 'ADD_SURVEY',
    id,
    survey,
    option
  }
};

export var addSeries = (id, surveys, option) => {
  return {
    type: 'ADD_SERIES',
    id,
    surveys,
    option
  }
};

export var deleteSurvey = (id, depth, option) => {
  return {
    type: 'DELETE_SURVEY',
    id,
    depth,
    option
  }
};

export var updateDHCoords = (id, points, option) => {
  return {
    type: 'UPDATE_DH_COORDS',
    id,
    points,
    option
  }
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  }
};

export var toggleCompleted = (id) => {
  return {
    type: 'TOGGLE_COMPLETED',
    id
  }
};

export var changeSurveyMethod = (method) => {
 return {
   type: 'CHANGE_SURVEY_METHOD',
   method
  }
};

export var changeProjectionMethod = (method) => {
 return {
   type: 'CHANGE_PROJECTION_METHOD',
   method
  }
};
