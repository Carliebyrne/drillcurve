export var addHole = (drillhole) => {
    return {
      type: 'ADD_HOLE',
      drillhole
    };
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
