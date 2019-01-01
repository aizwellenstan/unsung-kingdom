export default class Gate extends Phaser.GameObjects.Zone {
  constructor (scene, key, x, y, area) {
    const width = (area[2] + 1 - area[0]).toPixel
    const height = (area[3] + 1 - area[1]).toPixel
    super(scene, area[0].toPixel, area[1].toPixel, width, height)
    this.setOrigin(0, 0)
    scene.physics.world.enable(this)
    scene.physics.add.overlap(this, scene.player, () => {
      scene.mapChange(key, x, y)
    })
  }
}
