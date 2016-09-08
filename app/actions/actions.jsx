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

export var addSurvey = (id, survey) => {
  return {
    type: 'ADD_SURVEY',
    survey
  }
};

export var removeSurvey = (id, depth) => {
  return {
    type: 'REMOVE_SURVEY',
    depth
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
