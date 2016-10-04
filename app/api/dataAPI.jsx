module.exports = {
  minimumCurvature: function (collar, surveys) {
    return [];
  },
  tangential: function (collar, surveys) {
    return [];
  },
  simple: function (collar, surveys) {
    var points = {
      x: new Array(surveys.length),
      y: new Array(surveys.length),
      z: new Array(surveys.length)
    };
    var magnitudes = {
      x: new Array(surveys.length),
      y: new Array(surveys.length),
      z: new Array(surveys.length)
    };

    if (surveys.length < 1) {
      return {
        x: [collar.x],
        y: [collar.y],
        z: [collar.z]
      };
    }

    for (var i = 0; i < surveys.length; i++) {
      if (i === 0) {
        points.x[0] = collar.x;
        points.y[0] = collar.y,
        points.z[0] = collar.z
      } else {
        magnitudes.x[i] = (surveys[i].depth - surveys[i-1].depth) * Math.cos(surveys[i].azi * Math.PI / 180);
        magnitudes.y[i] = (surveys[i].depth - surveys[i-1].depth) * Math.sin(surveys[i].azi * Math.PI / 180);
        magnitudes.z[i] = (surveys[i].depth - surveys[i-1].depth) * Math.cos(surveys[i].dip * Math.PI / 180);

        points.x[i] = points.x[i - 1] + magnitudes.x[i];
        points.y[i] = points.y[i - 1] + magnitudes.y[i];
        points.z[i] = points.z[i - 1] + magnitudes.z[i];
      }
    }

    return points;
  }
};
