import battlers from './battlers'
export default () => {
  return {
    map: 'room1',
    x: 500,
    y: 600,
    r: 90,
    field: {},
    chapter: 0,
    allowed_map: 0,
    event: {
      chapter_begin: [false, false, false, false, false, false],
      m0_1: { started: true, completed: false, battled: false },
      m1_1: { started: false, completed: false, talked: false, d1: 0, d2: 0, d3: 0, d4: 0, d5: 0 },
      m1_2: { started: false, completed: false, talked: false, solved: false },
      m1_3: { started: false, completed: false, count: 0 },
      m1_4: { started: false, completed: false, solved: false, area: false },
      m2_1: { started: false, completed: false },
      m2_2: { started: false, completed: false },
      m2_3: { started: false, completed: false },
      m2_4: { started: false, completed: false },
      m3_1: { started: false, completed: false },
      m3_2: { started: false, completed: false },
      m3_3: { started: false, completed: false },
      m3_4: { started: false, completed: false },
      m4_1: { started: false, completed: false },
      m4_2: { started: false, completed: false },
      m4_3: { started: false, completed: false },
      m4_4: { started: false, completed: false },
      m5_1: { started: false, completed: false },
      m0: { talked_matilda: false, talked_annabelle: false, talked_amber: false, area: false },
      m1: { talked_sick: false },
      town: { amber: [], annabelle: [], matilda: [], elliott: [], max: [] }
    },
    treasures: [],
    battlers: battlers.filter((_, i) => i < 3).map((v, i) => Object.assign(v, { exp: 0, maxHp: v.hp, weapon: null })),
    weapons: [],
    saved: null
  }
}
