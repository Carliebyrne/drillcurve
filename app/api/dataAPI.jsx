module.exports = {
   desurvey: function (method, collar, surveys) {
      // Sort the array by depth
      surveys.sort((a, b) => {return a.depth-b.depth});

      // define two new object with arrays the same length as the survey array
      var points = {
         x: new Array(surveys.length),
         y: new Array(surveys.length),
         z: new Array(surveys.length)
      };

      switch (method) {
         case 'tangent':
            //loop through the array calculating the using the last survey to calculate the magnitude fo rx, y, and z and adding to the last point.
            for (var i = 0; i < surveys.length; i++) {
               if (i === 0) {
                  points.x[0] = collar.x;
                  points.y[0] = collar.y,
                  points.z[0] = collar.z
               } else {
                  let itwo = (90 + surveys[i].dip) * Math.PI / 180;
                  let atwo = surveys[i].azi * Math.PI / 180;
                  points.x[i] = points.x[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(itwo) * Math.sin(atwo);
                  points.y[i] = points.y[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(itwo) * Math.cos(atwo);
                  points.z[i] = points.z[i - 1] + (surveys[i].depth - surveys[i-1].depth) * -Math.cos(itwo);
               }
            }
            break;
         case 'avgAngle':
            for (var i = 0; i < surveys.length; i++) {
               if (i === 0) {
                  points.x[0] = collar.x;
                  points.y[0] = collar.y,
                  points.z[0] = collar.z
               } else {
                  let ione = 90 + surveys[i - 1].dip;
                  let itwo = 90 + surveys[i].dip;
                  let avgDip = (ione + itwo) / 2 * Math.PI / 180;
                  let avgAzi = (surveys[i].azi + surveys[i - 1].azi) / 2 * Math.PI / 180;
                  points.x[i] = points.x[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(avgDip) * Math.sin(avgAzi);
                  points.y[i] = points.y[i - 1] + (surveys[i].depth - surveys[i-1].depth) * Math.sin(avgDip) * Math.cos(avgAzi);
                  points.z[i] = points.z[i - 1] + (surveys[i].depth - surveys[i-1].depth) * -Math.cos(avgDip);
               }
            }
            break;
         case 'minCurve':
            for (var i = 0; i < surveys.length; i++) {
               if (i === 0) {
                  points.x[0] = collar.x;
                  points.y[0] = collar.y,
                  points.z[0] = collar.z
               } else {
                  let itwo = (90 + surveys[i].dip) * Math.PI / 180;
                  let atwo = (surveys[i].azi) * Math.PI / 180;
                  let ione = (90 + surveys[i - 1].dip) * Math.PI / 180;
                  let aone = surveys[i - 1].azi * Math.PI / 180;
                  let dogleg = Math.acos(Math.cos(itwo - ione) - Math.sin(ione) * Math.sin(itwo) * (1 - Math.cos(atwo - aone)));
                  if (dogleg < 0.25) {dogleg = 1};
                  let rf = 2 / dogleg * Math.tan(dogleg / 2);
                  points.x[i] = points.x[i - 1] + (surveys[i].depth - surveys[i-1].depth) / 2 * (Math.sin(ione) * Math.sin(aone) + Math.sin(itwo) * Math.sin(atwo)) * rf;
                  points.y[i] = points.y[i - 1] + (surveys[i].depth - surveys[i-1].depth) / 2 * (Math.sin(ione) * Math.cos(aone) + Math.sin(itwo) * Math.cos(atwo)) * rf;
                  points.z[i] = points.z[i - 1] + (surveys[i].depth - surveys[i-1].depth) / 2 * -(Math.cos(ione) + Math.cos(itwo)) * rf;
               }
            }
            break;
      }
      return points;
   },
   projection: function (method, actualSurveys, eoh) {
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
         var depth = actualSurveys[actualSurveys.length - 1].depth;
         build.sort((a, b) => a.depth - b.depth);

         switch (method) {
            case 'expSmooth':
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

            // grab the smoothed future build rate from the last value in the smoothed array
            var projDip = smoothed[smoothed.length - 1].dip;
            var projAzi = smoothed[smoothed.length - 1].azi;
            break;

            case 'movAvg':
               //grab the last three values of the build and turn
               var movAvg = build.slice(1).slice(-3);
               var projDip = 0; var projAzi = 0;

               //loop through summing the the dip and azis
               for (var i = 0; i < movAvg.length; i++) {
                  projDip = projDip + movAvg[i].dip;
                  projAzi = projAzi + movAvg[i].azi;
               }
               //divide by three for the simple average
               var projDip = projDip / 3; var projAzi = projAzi / 3;
               break;
            case 'lastValue':
               //store the last value into the projected dip and azi
               var projDip = build[build.length - 1].dip;
               var projAzi = build[build.length - 1].azi;
               break;
         }

         //store the last survey into the first projection survey
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
   },
   targetBox: function (target, lastSurvey) {
      var azi = lastSurvey.azi;
      let r = 0.5 * target.radius;

      //add or take 90
      if (azi >= 90) {
         azi = azi - 90;
      } else {
         azi = azi + 90;
      }

      //retun the values of the target box
      let x = r * Math.sin(azi * Math.PI / 180)
      let y = r * Math.cos(azi * Math.PI / 180)
      debugger;

      return {
         x: [target.x + x, target.x + x, target.x - x, target.x - x, target.x + x],
         y: [target.y + y, target.y + y, target.y - y, target.y - y, target.y + y],
         z: [target.z - r, target.z + r, target.z + r, target.z - r, target.z - r]
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
