module.exports = {
  minimumCurvature: function (collar, surveys) {
    return [];
  },
  tangential: function (collar, surveys) {
    return [];
  },
  simple: function (collar, surveys) {
    // Sort the array by depth
    surveys.sort((a, b) => {return a.depth-b.depth});

    // define two new object with arrays the same length as the survey array
    var points = {
      x: new Array(surveys.length),
      y: new Array(surveys.length),
      z: new Array(surveys.length)
    };

    for (var i = 0; i < surveys.length; i++) {
      if (i === 0) {
        points.x[0] = collar.x;
        points.y[0] = collar.y,
        points.z[0] = collar.z
      } else {
        points.x[i] = points.x[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.cos(surveys[i].azi * Math.PI / 180);
        points.y[i] = points.y[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(surveys[i].azi * Math.PI / 180);
        points.z[i] = points.z[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.cos(surveys[i].dip * Math.PI / 180);
      }
    }

    return points;
  }
};
