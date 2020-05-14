import battlers from './battlers'
const getPlayerBattlers = () => {
  const players = JSON.parse(JSON.stringify(battlers.slice(0, 3)))
  players.forEach(v => Object.assign(v, { exp: 0, max_hp: v.hp, weapon: null }))
  return players
}
export default () => {
  return {
    map: 'room1',
    x: 500,
    y: 600,
    r: 90,
    chapter: 0,
    allowed_area: 0,
    visited: [],
    event: {
      chapter_begin: [false, false, false, false, false, false],
      m0_1: { started: true, completed: false, battled: false },
      m1_1: { started: false, completed: false, talked: false, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0 },
      m1_2: { started: false, completed: false, talked: false, solved: false },
      m1_3: { started: false, completed: false, count: 0 },
      m1_4: { started: false, completed: false, solved: false, area: false },
      m2_1: { started: false, completed: false, wine: [], talked: false, key: false, opened: false },
      m2_2: { started: false, completed: false, count: 0 },
      m2_3: { started: false, completed: false, solved: false, talked: false },
      m2_4: { started: false, completed: false, solved: false, jack: false, talked: false, search: false, found: false, boss: false },
      m3_1: { started: false, completed: false },
      m3_2: { started: false, completed: false, count: 0 },
      m3_3: { started: false, completed: false, solved: false },
      m3_4: { started: false, completed: false, ghosts: [] },
      m3_5: { started: false, completed: false },
      m4_1: { started: false, completed: false },
      m4_2: { started: false, completed: false, count: 0 },
      m4_3: { started: false, completed: false, talked: false },
      m4_4: { started: false, completed: false, apples: [] },
      m4_5: { started: false, completed: false, area1: false, area2: false },
      m5_1: { started: false, completed: false, soldiers: false },
      m0: { talked_matilda: false, talked_annabelle: false, talked_amber: false, area: false },
      m1: { talked_amber: false, talked_annabelle: false, talked_elliott: false },
      m2: { talked_amber1: false, talked_elliott: false, talked_annabelle: false, talked_amber2: false },
      m3: { talked_amber: false, talked_max: false, talked_matilda: false },
      m4: {
        talked_amber: false, talked_elliott: false, talked_max: false, talked_matilda: false, talked_annabelle: false,
        talked_mary: false, talked_loretta: false, talked_dario: false, talked_drystan: false, talked_ray: false
      },
      town: { amber: [], annabelle: [], matilda: [], elliott: [], max: [] }
    },
    tweets: [],
    gimmicks: [],
    treasures: [],
    battlers: getPlayerBattlers(),
    counter_delay: 1000,
    weapons: [],
    saved: null,
    sec: 0
  }
}
