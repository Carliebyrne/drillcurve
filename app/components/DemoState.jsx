export var initialState = {
  userName: 'Jacob',
  company: 'Carvell Labs',
  showCompleted: true,
  drillholes: [
    {
      id: 'DDH001',
      active: true,
      created: undefined,
      completed: false,
      completedAt: undefined,
      mFromTarget: 10,
      lastSurvey: {dip: -20, azi: 230},
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0},
      planSurvey: [{dip: -18, azi: 228}],
      actualSurvey: [{dip: -20, azi: 230}],
      planPoints: {x: [0], y: [0], z: [0]},
      actualPoints: {x: [0], y: [0], z: [0]}
    },
    {
      id: 'DDH002',
      active: false,
      created: undefined,
      completed: false,
      completedAt: undefined,
      mFromTarget: 15,
      lastSurvey: {dip: -50, azi: 100},
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0},
      planSurvey: [{dip: -18, azi: 228}],
      actualSurvey: [{dip: -20, azi: 230}],
      planPoints: {x: [0], y: [0], z: [0]},
      actualPoints: {x: [0], y: [0], z: [0]}
    },
    {
      id: 'DDH003',
      active: false,      
      created: undefined,
      completed: true,
      completedAt: 500,
      mFromTarget: 8,
      lastSurvey: {dip: -15, azi: 290},
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0},
      planSurvey: [{dip: -18, azi: 228}],
      actualSurvey: [{dip: -20, azi: 230}],
      planPoints: {x: [0], y: [0], z: [0]},
      actualPoints: {x: [0], y: [0], z: [0]}
    }
  ],
};
