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
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0},
      planSurvey: [{depth:0,dip:-18,azi:228},{depth:30,dip:-18.2,azi:228.2},{depth:60,dip:-18.4,azi:228.4},{depth:90,dip:-18.6,azi:228.6},{depth:120,dip:-18.8,azi:228.8},{depth:150,dip:-19,azi:229},{depth:180,dip:-19.2,azi:229.2},{depth:210,dip:-19.4,azi:229.4},{depth:240,dip:-19.6,azi:229.6},{depth:270,dip:-19.8,azi:229.8},{depth:300,dip:-20,azi:230},{depth:330,dip:-20.2,azi:230.2},{depth:360,dip:-20.4,azi:230.4},{depth:390,dip:-20.6,azi:230.6},{depth:420,dip:-20.8,azi:230.8},{depth:450,dip:-21,azi:231},{depth:480,dip:-21.2,azi:231.2},{depth:510,dip:-21.4,azi:231.4},{depth:540,dip:-21.6,azi:231.6},{depth:570,dip:-21.8,azi:231.8},{depth:600,dip:-22,azi:232}],
      actualSurvey: [{depth:0,dip:-18,azi:228,temp:30,mag:50000},{depth:30,dip:-18.2,azi:228.2,temp:30,mag:50000},{depth:60,dip:-18.4,azi:228.4,temp:30,mag:50000},{depth:90,dip:-18.6,azi:228.6,temp:30,mag:50000},{depth:120,dip:-18.8,azi:228.8,temp:30,mag:50000},{depth:150,dip:-19,azi:229,temp:30,mag:50000},{depth:180,dip:-19.2,azi:229.2,temp:30,mag:50000},{depth:210,dip:-19.4,azi:229.4,temp:30,mag:50000},{depth:240,dip:-19.6,azi:229.6,temp:30,mag:50000},{depth:270,dip:-19.8,azi:229.8,temp:30,mag:50000},{depth:300,dip:-20,azi:230,temp:30,mag:50000},{depth:330,dip:-20.2,azi:230.2,temp:30,mag:50000},{depth:360,dip:-20.4,azi:230.4,temp:30,mag:50000},{depth:390,dip:-20.6,azi:230.6,temp:30,mag:50000},{depth:420,dip:-20.8,azi:230.8,temp:30,mag:50000},{depth:450,dip:-21,azi:231,temp:30,mag:50000},{depth:480,dip:-21.2,azi:231.2,temp:30,mag:50000},{depth:510,dip:-21.4,azi:231.4,temp:30,mag:50000},{depth:540,dip:-21.6,azi:231.6,temp:30,mag:50000},{depth:570,dip:-21.8,azi:231.8,temp:30,mag:50000},{depth:600,dip:-22,azi:232,temp:30,mag:50000}],
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
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0},
      planSurvey: [{depth: 0, dip: -18, azi: 228}],
      actualSurvey: [{depth: 0, dip: -20, azi: 230, temp: 30, mag: 50000}],
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
      collar: {x: 0, y: 0, z: 0},
      target: {x: 0, y: 0, z: 0, radius: 0},
      planSurvey: [{depth: 0, dip: -18, azi: 228}],
      actualSurvey: [{depth: 0, dip: -20, azi: 230, temp: 30, mag: 50000}],
      planPoints: {x: [0], y: [0], z: [0]},
      actualPoints: {x: [0], y: [0], z: [0]}
    }
  ],
};
