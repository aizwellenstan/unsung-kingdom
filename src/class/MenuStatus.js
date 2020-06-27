import config from '../data/config'
import Box from './Box'
import Gauge from './Gauge'
import ExpGauge from './ExpGauge'
import Pager from './Pager'
import weapons from '../data/weapons'
import { slideOut, slideIn } from '../util/animations'
import storage from '../data/storage'
import abilities from '../data/abilities'
const PER_PAGE = 7
export default class MenuStatus extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene)
    this.scene = scene
    const title = scene.add.text(20, 15, 'CHARACTERS', { align: 'center', fill: config.COLORS.theme.toColorString, fontSize: 21, fontStyle: 'bold', fontFamily: config.FONTS.UI })
    const sub = scene.add.text(20, 41, t('ui.sub.characters'), { align: 'center', fill: config.COLORS.gray.toColorString, fontSize: 10, fontStyle: 'bold', fontFamily: config.FONTS.TEXT })
    this.add([title, sub])
    const players = scene.storage.state.battlers
    this.tabs = players.map((p, i) => this.getTabItem(p, 380 + i * 145, (60).byBottom))
    slideIn(this.scene, this.tabs, { x: -100 })
    this.add(this.tabs)
    this.page = this.pageMax
    this.setWeaponList(true)
    this.setCharacter(players[0])
    this.add(this.getExplanation(750, 30))
  }
  getExplanation (x, y) {
    const explain = this.scene.add.container(x, y)
    const addition = Object.keys(abilities).map(k => abilities[k]).reduce((x, ability, i) => {
      const icon = this.scene.add.sprite(x, 0, 'weapon_abilities').setOrigin(0, 0).setScale(0.7).setFrame(i)
      x += icon.width
      const desc = this.scene.add.text(x, 0, ability.label, { align: 'right', fill: config.COLORS.gray.toColorString, fontSize: 10, fontStyle: 'bold', fontFamily: config.FONTS.UI }).setOrigin(0, 0)
      x += desc.width + 15
      explain.add([icon, desc])
      return x
    }, 0)
    explain.x -= addition
    return explain
  }
  get availableWeapons () {
    const usingWeaponIds = storage.state.battlers.map(v => v.weapon).filter(id => id)
    return storage.state.weapons.filter(v => !usingWeaponIds.includes(v.id))
  }
  get weaponGroup () {
    const weaponIds = []
    this.availableWeapons.forEach(w => {
      if (!weaponIds.includes(w.weapon_id)) weaponIds.push(w.weapon_id)
    })
    weaponIds.sort((a, b) => a - b)
    const list = weaponIds.map(id => {
      const data = weapons.find(v => v.id === id)
      const count = this.availableWeapons.filter(v => v.weapon_id === id).length
      return Object.assign({ count }, data)
    })
    return list
  }
  get pageMax () {
    return Math.ceil(this.weaponGroup.length / PER_PAGE)
  }
  setWeaponList (anim) {
    this.page = Math.fix(this.page, 1, this.pageMax)
    if (this.weapons) this.weapons.destroy()
    this.weapons = this.scene.add.container(560, 135)
    const offset = PER_PAGE * (this.page - 1)
    this.weapons.add(this.weaponGroup.slice(offset, offset + PER_PAGE).map((v, i) => this.getWeapon(v, 0, i * 40)))
    this.add(this.weapons)
    if (anim) slideIn(this.scene, this.weapons.list, { x: -100 })
    if (!this.pager) {
      this.pager = new Pager(this.scene, 380, 425, 360).on('prev', this.movePage.bind(this, -1)).on('next', this.movePage.bind(this, 1))
      this.add(this.pager)
    }
    this.pager.set(this.page > 1, this.page < this.pageMax)
  }
  movePage (add) {
    this.page += add
    this.setWeaponList(true)
  }
  setCharacter (chara) {
    if (this.chara) {
      if (this.chara.battler === chara) return
      slideOut(this.scene, [this.chara, this.currentWeapon], { x: -50 })
    }
    this.tabs.forEach(tab => tab.setActive(tab.chara === chara))
    this.chara = this.getCharacter(chara, 210, (30).byBottom)
    this.currentWeapon = this.getCurrentWeapon(this.chara.battler.weapon, 560, 75)
    this.add([this.chara, this.currentWeapon])
    slideIn(this.scene, [this.chara, this.currentWeapon], { x: -50 })
  }
  setWeapon (weaponId) {
    const found = this.availableWeapons.find(v => v.weapon_id === weaponId)
    this.chara.battler.weapon = found ? found.id : null
    this.currentWeapon.setSource(this.chara.battler.weapon)
    this.setWeaponList(false)
  }
  getCharacter (chara, x, y) {
    const container = this.scene.add.container(x - 50, y).setAlpha(0)
    container.battler = chara
    const imgBg = this.scene.add.sprite(-10, -5, chara.key).setOrigin(0.5, 1).setScale(0.64, 0.64).setTint(0).setAlpha(0.5)
    const img = this.scene.add.sprite(0, 0, chara.key).setOrigin(0.5, 1).setScale(0.64, 0.64)
    container.add([imgBg, img])
    const charaInformation = this.scene.add.container(-81, -158)
    const name = this.scene.add.text(0, 0, chara.name, { fill: config.COLORS.theme.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 3, fontSize: 22, fontStyle: 'bold', fontFamily: config.FONTS.UI })
    const lv = this.scene.add.text(25 + chara.name.length * 9, 7, `Lv ${chara.lv}`, { fill: config.COLORS.theme.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 14, fontStyle: 'bold', fontFamily: config.FONTS.UI })
    const hpLabel = this.scene.add.text(0, 40, 'HP', { fill: config.COLORS.soy.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 11, fontStyle: 'bold', fontFamily: config.FONTS.UI })
    const hpMaxLabel = this.scene.add.text(162, 55, `/${chara.max_hp}`, { fill: config.COLORS.soy.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 15, fontStyle: 'bold', fontFamily: config.FONTS.UI }).setOrigin(1, 1)
    const hpValueLabel = this.scene.add.text(hpMaxLabel.x - hpMaxLabel.width, 56, chara.hp, { fill: config.COLORS.soy.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 19, fontStyle: 'bold', fontFamily: config.FONTS.UI }).setOrigin(1, 1)
    const gauge = new Gauge(this.scene, 160, 10, { valueMax: chara.max_hp, color: config.COLORS.theme }).setPosition(81, 62)
    const exp = new ExpGauge(this.scene, 81, 95, 160, chara.lv, chara.exp)
    const option = { fill: config.COLORS.soy.toColorString, stroke: config.COLORS.dark.toColorString, strokeThickness: 2, fontSize: 15, fontStyle: 'bold', fontFamily: config.FONTS.UI }
    const atk = this.scene.add.text(0, 110, 'ATK', option)
    const atkVal = this.scene.add.text(70, 110, chara.atk, option).setOrigin(1, 0)
    const def = this.scene.add.text(0, 132, 'DEF', option)
    const defVal = this.scene.add.text(70, 132, chara.def, option).setOrigin(1, 0)
    const dex = this.scene.add.text(92, 110, 'DEX', option)
    const dexVal = this.scene.add.text(162, 110, chara.dex, option).setOrigin(1, 0)
    const agi = this.scene.add.text(92, 132, 'AGI', option)
    const agiVal = this.scene.add.text(162, 132, chara.agi, option).setOrigin(1, 0)
    const statuses = [atk, atkVal, def, defVal, dex, dexVal, agi, agiVal]
    gauge.value = chara.hp
    charaInformation.add([name, lv, hpLabel, hpMaxLabel, hpValueLabel, gauge, exp, ...statuses])
    container.add(charaInformation)
    return container
  }
  getTabItem (chara, x, y) {
    const container = this.scene.add.container(x, y).setSize(140, 45)
    container.chara = chara
    const box = new Box(this.scene, 0, 0, 140, 45)
    const sprite = this.scene.add.sprite(-76, -16, chara.key).setScale(0.25).setOrigin(0, 0)
    sprite.setCrop(0, 0, sprite.width, 150)
    const text = this.scene.add.text(52, 18, chara.name, { fontSize: 14, fontStyle: 'bold', fontFamily: config.FONTS.UI }).setOrigin(1, 1)
    container.setActive = bool => text.setFill(config.COLORS[bool ? 'theme' : 'white'].toColorString)
    container.setInteractive().on('pointerdown', () => {
      this.scene.audio.se('click')
      this.setCharacter(chara)
    })
    container.add([box, sprite, text])
    return container
  }
  idToWeaponData (id) {
    if (!id) return null
    const src = storage.state.weapons.find(v => v.id === id)
    return weapons.find(v => v.id === src.weapon_id)
  }
  getCurrentWeapon (id, x, y) {
    const container = this.scene.add.container(x, y).setSize(360, 45)
    const box = new Box(this.scene, 0, 0, 360, 40).setOrigin(0.5, 0.5)
    const icon = this.scene.add.sprite(-168, 0).setScale(0.22).setOrigin(0, 0.5).setTint(config.COLORS.ghost)
    const text = this.scene.add.text(-138, 0, null, { fontSize: 15, fontStyle: 'bold', fontFamily: config.FONTS.TEXT }).setOrigin(0, 0.5)
    const status = this.scene.add.text(137, 0, null, { fontSize: 13, fontStyle: 'bold', fontFamily: config.FONTS.UI, fill: config.COLORS.gray.toColorString }).setOrigin(1, 0.5)
    const ability = this.scene.add.sprite(165, 0, 'weapon_abilities').setOrigin(1, 0.5)
    const line1 = this.scene.add.line(-177, 0, 0, 0, 40, 0, config.COLORS.white).setOrigin(1, 0).setLineWidth(0.5).setAlpha(0.5)
    const line2 = this.scene.add.line(-192, 1, 0, 0, -25, 120, config.COLORS.white).setOrigin(1, 0).setLineWidth(0.5).setAlpha(0.5)
    const line3 = this.scene.add.line(-242, 121, 0, 0, 80, 0, config.COLORS.white).setOrigin(1, 0).setLineWidth(0.5).setAlpha(0.5)
    const circle = this.scene.add.circle(-322, 123, 2, config.COLORS.white).setOrigin(0.5, 0.5)
    container.setInteractive().on('pointerdown', () => {
      this.scene.audio.se('click')
      this.setWeapon(null)
    })
    container.setSource = id => {
      const data = this.idToWeaponData(id)
      icon.setVisible(Boolean(data))
      ability.setVisible(Boolean(data))
      text.text = data ? data.name : '-'
      status.text = data ? this.getStatusText(data) : null
      if (data) {
        icon.setTexture(`icon/${data.icon}`)
        ability.setFrame(Math.max(data.ability - 1, 0)).setVisible(data.ability !== null)
      }
    }
    container.setSource(id)
    container.add([box, icon, text, status, ability, line1, line2, line3, circle])
    return container
  }
  getStatusText (source) {
    return ['atk', 'def', 'dex', 'agi'].filter(key => source[key]).map(key => {
      return `${key.toUpperCase()}: ${source[key]}`
    }).join('   ')
  }
  getWeapon (weapon, x, y) {
    const container = this.scene.add.container(x, y).setSize(360, 45)
    const box = new Box(this.scene, 0, 0, 360, 32).setOrigin(0.5, 0.5)
    const icon = this.scene.add.sprite(-168, 0, `icon/${weapon.icon}`).setScale(0.2).setOrigin(0, 0.5).setTint(config.COLORS.ghost)
    const text = this.scene.add.text(-138, 0, weapon.name, { fontSize: 14, fontStyle: 'bold', fontFamily: config.FONTS.TEXT }).setOrigin(0, 0.5)
    const status = this.scene.add.text(137, 0, this.getStatusText(weapon), { fontSize: 12, fontFamily: config.FONTS.UI, fill: config.COLORS.gray.toColorString }).setOrigin(1, 0.5)
    container.add([box, icon, text, status])
    if (weapon.ability) {
      const ability = this.scene.add.sprite(165, 0, 'weapon_abilities').setFrame(weapon.ability - 1).setOrigin(1, 0.5)
      container.add(ability)
    }
    if (weapon.count > 1) {
      const count = this.scene.add.text(-133 + text.width, 0, `* ${weapon.count}`, { fontSize: 11, fontFamily: config.FONTS.UI, fill: config.COLORS.gray.toColorString }).setOrigin(0, 0.5)
      container.add([count])
    }
    container.setInteractive().on('pointerdown', () => {
      this.scene.audio.se('click')
      this.setWeapon(weapon.id)
    })
    return container
  }
}
