import { architect } from '../event/lorraine'
export default {
  name: 'グリファルデ神殿 - 中央部',
  enemyLevel: 28,
  enemyGroups: [
    ['bird'],
    ['bird', 'bird'],
    ['lizard'],
    ['lizard', 'lizard'],
    ['bird', 'lizard', 'bird']
  ],
  create (scene) {
    const arct = scene.map.getObjectById(3).setRandomWalk(true)
    architect(scene, arct)
  }
}
