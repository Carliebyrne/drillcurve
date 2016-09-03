import React from 'react';
import Plotly from 'plotly';

var Plot = React.createClass({
  getInitialState: function () {
    return {
      id: 'plot',
      data: [
        {
          x: [224919.189607, 224910.778695828, 224898.27484516, 224877.154403426, 224856.145806355, 224835.249629906, 224814.897145042, 224794.737770903, 224774.773042702, 224755.004480832, 224735.433590745, 224716.06186284],
          y: [7200204.883233, 7200196.32422761, 7200183.3761112, 7200162.07054994, 7200140.65469485, 7200119.12913307, 7200097.08879823, 7200074.87169594, 7200052.47951811, 7200029.91397, 7200007.17677006, 7199984.26964981],
          z: [1818.53511, 1814.96661151107, 1809.52395347756, 1800.25344364631, 1790.79887874481, 1781.21025178417, 1771.62162482353, 1761.88428988188, 1751.99851391317, 1741.96456794093, 1731.78272705088, 1721.45327038332],
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
              color: '#1f77b4',
              width: 4
          },
          type: 'scatter3d'
        }, {
            x: [224919.189607, 224910.778695828, 224897.72195715, 224876.844573252, 224856.15598694, 224836.004369261, 224817.124757529, 224797.222637849, 224778.135443399, 224758.394307588, 224739.175059044, 224719.537482897],
            y: [7200204.883233, 7200196.32422761, 7200183.93384525, 7200162.39005631, 7200140.66490047, 7200118.44076258, 7200095.12638374, 7200072.67854125, 7200049.53380086, 7200026.94425556, 7200003.90905455, 7199981.22942485],
            z: [1818.53511, 1814.94662049293, 1809.44410500359, 1800.12381211467, 1790.7537645593, 1781.58290541041, 1772.61168164273, 1763.48071412314, 1754.47751905854, 1745.37209152873, 1736.34844072687, 1727.25936260763],
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
                color: '#27ae60',
                width: 4
            },
            type: 'scatter3d'
          }, {
              x: [224731.333276338, 224700.790449343, 224700.790449343, 224731.333276338, 224731.333276338],
              y: [7199971.35516454, 7199997.18413508, 7199997.18413508, 7199971.35516454, 7199971.35516454],
              z: [1741.45327038332, 1741.45327038332, 1701.45327038332, 1701.45327038332, 1741.45327038332],
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
          }
        ]
    }
  },
  componentDidMount: function () {
    this.plot(this.state)
  },
  plot: function (data) {
    var {id, data} = this.state;
    Plotly.newPlot(id, data);
  },
  render: function () {
    return (
      <div id={this.state.id}>
      </div>
    )
  }
});

module.exports = Plot;
