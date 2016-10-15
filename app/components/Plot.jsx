import React from 'react';
import Plotly from 'plotly';
import {connect} from 'react-redux';

var Plot = React.createClass({
  getInitialState: function () {
    var {drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];

    return {
      id: 'plot',
      data: [
        {
          x: drillhole.planPoints.x,
          y: drillhole.planPoints.y,
          z: drillhole.planPoints.z,
          mode: 'lines',
          name: 'Plan',
          marker: {
              color: '#1f77b4',
              size: 12,
              symbol: 'circle',
              line: {
              color: 'rgb(0,0,0)',
              width: 0
              }
          },
          line: {
              color: '#1f77b4',
              width: 4
          },
          type: 'scatter3d'
        }, {
            x: drillhole.actualPoints.x,
            y: drillhole.actualPoints.y,
            z: drillhole.actualPoints.z,
            mode: 'lines',
            name: 'Actual',
            marker: {
                color: '#1f77b4',
                size: 12,
                symbol: 'circle',
                line: {
                color: 'rgb(0,0,0)',
                width: 0
                }
            },
            line: {
                color: '#27ae60',
                width: 4
            },
            type: 'scatter3d'
          }, {
              x: drillhole.targetBox.x,
              y: drillhole.targetBox.y,
              z: drillhole.targetBox.z,
              mode: 'lines',
              name: 'Target Box',
              marker: {
                  color: '#1f77b4',
                  size: 12,
                  symbol: 'circle',
                  line: {
                  color: 'rgb(0,0,0)',
                  width: 0
                  }
              },
              line: {
                  color: '#2c3e50',
                  width: 2
              },
              type: 'scatter3d'
          }, {
              x: drillhole.projectedPoints.x,
              y: drillhole.projectedPoints.y,
              z: drillhole.projectedPoints.z,
              mode: 'lines',
              name: 'Projected',
              marker: {
                  color: '#FF7C38',
                  size: 12,
                  symbol: 'circle',
                  line: {
                  color: 'rgb(0,0,0)',
                  width: 0
                  }
              },
              line: {
                  color: '#F98B60',
                  width: 4
              },
              type: 'scatter3d'
            }
        ],
        layout: {
          autosize: false,
          width: 1000,
          height: 800,
          aspectratio: {
           x: 1, y: 1, z: 1,
          },
        }
      }
  },
  componentDidMount: function () {
    this.plot(this.state);
  },
  componentDidUpdate: function () {
    this.redrawGraph();
  },
  redrawGraph: function () {
    var {drillholes} = this.props;
    var drillhole = drillholes.filter((el) => {
      if (el.active === true) {
        return true;
      }
    })[0];
    var {id} = this.state;
    var plotDiv = document.getElementById(this.state.id);
    plotDiv.data[0].x = drillhole.planPoints.x; plotDiv.data[0].y = drillhole.planPoints.y; plotDiv.data[0].z = drillhole.planPoints.z;
    plotDiv.data[1].x = drillhole.actualPoints.x; plotDiv.data[1].y = drillhole.actualPoints.y; plotDiv.data[1].z = drillhole.actualPoints.z;
    plotDiv.data[2].x = drillhole.targetBox.x; plotDiv.data[2].y = drillhole.targetBox.y; plotDiv.data[2].z = drillhole.targetBox.z;
    plotDiv.data[3].x = drillhole.projectedPoints.x; plotDiv.data[3].y = drillhole.projectedPoints.y; plotDiv.data[3].z = drillhole.projectedPoints.z;

    Plotly.redraw(plotDiv);
  },
  plot: function (data) {
    var {id, data, layout} = this.state;
    Plotly.newPlot(id, data, layout);
  },
  render: function () {
    return (
      <div id={this.state.id}>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      drillholes: state.drillholes
    }
  }
)(Plot);
