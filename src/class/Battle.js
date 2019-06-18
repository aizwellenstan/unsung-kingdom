import config from '../data/config'
import EnemyBattler from './EnemyBattler'
import PlayerBattler from './PlayerBattler'
const positions = {
  1: [0],
  2: [-130, 130],
  3: [-240, 0, 240],
  4: [-340, -110, 110, 340],
  5: [-360, -180, 0, 180, 360],
}
export default class Battle extends Phaser.GameObjects.Container {
  constructor (scene, callback) {
    super(scene)
    this.scene = scene
    this.callback = callback
    scene.add.existing(this)
    scene.scene.pause('Game')
    this.window = this.scene.add.rectangle(0, 0, config.WIDTH, config.HEIGHT, 0x000000, 100).setOrigin(0, 0)
    this.enemies = this.scene.add.container(0, 0)
    this.players = this.scene.add.container(0, 0)
    this.add([this.window, this.enemies, this.players])
    // test image
    this.enemies.add(new EnemyBattler(this.scene, this.tapEnemy.bind(this)).setPosition(config.WIDTH.half, config.HEIGHT.half - 100))
    this.enemies.add(new EnemyBattler(this.scene, this.tapEnemy.bind(this)).setPosition(config.WIDTH.half, config.HEIGHT.half - 100))
    this.enemies.add(new EnemyBattler(this.scene, this.tapEnemy.bind(this)).setPosition(config.WIDTH.half, config.HEIGHT.half - 100))
    // test image
    this.players.add(new PlayerBattler(this.scene).setPosition(config.WIDTH.half, config.HEIGHT.half + 100))
    this.players.add(new PlayerBattler(this.scene).setPosition(config.WIDTH.half, config.HEIGHT.half + 100))
    // register
    this.all = []
    this.players.list.forEach(v => this.all.push(v))
    this.enemies.list.forEach(v => this.all.push(v))
    this.turnIndex = 0
    this.execEnemyTurn()
  }
  preUpdate () {
    if (this.victory) this.end()
    this.enemies.list.forEach((v, i) => {
      v.x = config.WIDTH.half + positions[this.enemies.length][i]
    })
  }
  increaseTurn () {
    this.turnIndex = this.turnIndex < (this.all.length - 1) ? this.turnIndex + 1 : 0
    this.execEnemyTurn()
  }
  execEnemyTurn () {
    if (this.all[this.turnIndex].constructor.name !== 'EnemyBattler') return
    setTimeout(() => {
      this.players.list[0].addDamage(Math.randomInt(10, 20))
      this.increaseTurn()
    }, 1000)
  }
  tapEnemy (enemy) {
    if (this.all[this.turnIndex].constructor.name !== 'PlayerBattler') return
    enemy.addDamage(Math.randomInt(60, 200))
    this.increaseTurn()
  }
  get victory () {
    return this.enemies.list.length === 0
  }
  end () {
    this.scene.scene.resume('Game')
    this.destroy()
    this.callback(this)
  }
}
