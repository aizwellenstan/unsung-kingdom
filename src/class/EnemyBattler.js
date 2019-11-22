import Battler from './Battler'
import Gauge from './Gauge'
import config from '../data/config'
export default class EnemyBattler extends Battler {
  constructor (scene, status, boss) {
    super(scene, status)
    // image
    this.sprite = this.scene.add.sprite(0, 0, `battler/${status.key}`)
    this.sprite.setScale(1)
    this.add(this.sprite)
    // name
    this.nameLabel = this.scene.add.text(0, -155, boss ? status.name : `${status.name} Lv ${this.lv}`, { fill: config.COLORS.gray.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 12, fontStyle: 'bold', fontFamily: config.FONTS.TEXT }).setOrigin(0.5, 1)
    this.add(this.nameLabel)
    if (!boss) {
      // hp
      this.hpMaxLabel = this.scene.add.text(0, -136, `/${this.maxHp}`, { fill: config.COLORS.soy.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 12, fontStyle: 'bold', fontFamily: config.FONTS.UI }).setOrigin(0, 1)
      this.add(this.hpMaxLabel)
      this.hpValueLabel = this.scene.add.text(0, -135, this.hp, { fill: config.COLORS.soy.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 16, fontStyle: 'bold', fontFamily: config.FONTS.UI }).setOrigin(1, 1)
      this.add(this.hpValueLabel)
      // gauge
      this.gauge = new Gauge(this.scene, 100, 7, this.hp, 0xEE8811).setPosition(0, -130)
      this.add(this.gauge)
    }
  }
  get hp () {
    return this._hp
  }
  set hp (value) {
    this._hp = Math.fix(value, 0, this.maxHp)
    if (!this.gauge) return
    this.gauge.value = this.hp
    this.hpMaxLabel.setText(`/${this.maxHp}`)
    this.hpValueLabel.setText(this.hp)
  }
  attackAnim () {
    return new Promise(resolve => {
      this.scene.add.tween({
        targets: this.sprite, duration: 40, ease: 'Power2', yoyo: true,
        y: this.sprite.y - 10,
        onComplete: () => {
          this.scene.add.tween({
            targets: this.sprite, duration: 60, ease: 'Power2', yoyo: true,
            y: this.sprite.y + 50,
            onComplete: resolve
          })
        }
      })
    })
  }
  die () {
    return new Promise(resolve => {
      this.sprite.setTint(0xFF0000)
      this.scene.add.tween({
        targets: this.sprite, duration: 300, ease: 'Power2',
        scaleX: 1.3, scaleY: 1.3, alpha: 0.2,
        onComplete: () => {
          this.destroy()
          resolve()
        }
      })
    })
  }
}
