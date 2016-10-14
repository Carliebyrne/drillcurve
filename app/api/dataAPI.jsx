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

      //loop through the array calculating the using the last survey to calculate the magnitude fo rx, y, and z and adding to the last point.
      for (var i = 0; i < surveys.length; i++) {
         if (i === 0) {
            points.x[0] = collar.x;
            points.y[0] = collar.y,
            points.z[0] = collar.z
         } else {
            points.x[i] = points.x[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.cos(surveys[i].azi * Math.PI / 180);
            points.y[i] = points.y[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(surveys[i].azi * Math.PI / 180);
            points.z[i] = points.z[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(surveys[i].dip * Math.PI / 180);
         }
      }
      return points;
   },
   projection: function (method, actualSurveys, eoh) {
      switch (method) {
         case 'expSmooth':

            //check if there are less than two surveys.
            if (actualSurveys.length < 2) {
               return [{
                  depth: 0,
                  dip: 0,
                  azi: 0
               }];
            }

            //Generate the build rates from the actual surveys
            var build = this.buildRates(actualSurveys);

            //calculate the median survey depth to project forward
            build.sort((a, b) => a.depthChg - b.depthChg);
            let lowMiddle = Math.floor((build.length - 1) / 2);
            let highMiddle = Math.ceil((build.length - 1) / 2);
            var medianDepth = (build[lowMiddle].depthChg + build[highMiddle].depthChg) / 2;

            //Create the smoothed array and calculate the exponentially smoothed build rates using the single exponential smoothing formula
            var smoothed = new Array(build.length);
            for (var i = 0; i < smoothed.length; i++) {
               if (i === 0) {
                  smoothed[0] = {
                     dip: build[0].dip,
                     azi: build[0].azi
                  }
               } else {
                  smoothed[i] = {
                     dip: build[i].dip * 0.2 + (1 - 0.2) * smoothed[i - 1].dip,
                     azi: build[i].azi * 0.2 + (1 - 0.2) * smoothed[i - 1].azi
                  }
               }
            }

            // grab the smoothed future build rate from the last value in the smoothed array and store the last survey into the first projection survey
            let depth = actualSurveys[actualSurveys.length - 1].depth;
            let projDip = smoothed[smoothed.length - 1].dip;
            let projAzi = smoothed[smoothed.length - 1].azi;
            var projected = [{
               depth: depth,
               dip: actualSurveys[actualSurveys.length - 1].dip,
               azi: actualSurveys[actualSurveys.length - 1].azi
            }];
            i = 0;

            //loop through checking that the depth is still less than the end of hole value projecting forward by the median depth change each iteration
            while (projected[i].depth < eoh && projected[i].depth + medianDepth < eoh) {

               projected = [
                  ...projected,
                  {
                     depth: projected[i].depth + medianDepth,
                     dip: projected[i].dip + projDip,
                     azi: projected[i].azi + projAzi,
                  }
               ]
               i++;
            }

            //if the loop stopped before the eoh (it almost always will) add another projection at the eoh depth.
            if (i > 0 && projected[i].depth < eoh && projected[i].depth + medianDepth >= eoh) {
               projected = [
                  ...projected,
                  {
                     depth: eoh,
                     dip: projected[i].dip + projDip,
                     azi: projected[i].azi + projAzi,
                  }
               ]
            }

            //sort and return the result
            projected.sort((a, b) => a.depth - b.depth);
            return projected;
      }
   },
   buildRates: function (surveys) {
      var build = new Array(surveys.length - 1);
      for (var i = 0; i < surveys.length - 1; i++) {
         build[i] = {
            depth: surveys[i + 1].depth,
            depthChg: surveys[i + 1].depth - surveys[i].depth,
            dip: surveys[i + 1].dip - surveys[i].dip,
            azi: surveys[i + 1].azi - surveys[i].azi
         }
      }
      return build;
   }
};
