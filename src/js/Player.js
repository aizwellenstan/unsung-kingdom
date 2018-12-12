export default class Player extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'player')
    scene.physics.world.enable(this)
    scene.add.existing(this)
  }
  update (pointer) {
    if (pointer.isDown) this.setTargetPosition(pointer)
    this._walkToTargetPosition()
  }
  setTargetPosition (pointer) {
    this._targetPositionX = pointer.worldX
    this._targetPositionY = pointer.worldY
  }
  get diffToTargetPositionX () {
    return this._targetPositionX ? this._targetPositionX - this.x : 0
  }
  get diffToTargetPositionY () {
    return this._targetPositionY ? this._targetPositionY - this.y : 0
  }
  _walkToTargetPosition () {
    this.body.setVelocity(0)
    if (Math.hypot(this.diffToTargetPositionX, this.diffToTargetPositionY) < 1) return
    this.body.setVelocityX(this.diffToTargetPositionX)
    this.body.setVelocityY(this.diffToTargetPositionY)
    this.body.velocity.normalize().scale(100)
  }
}
