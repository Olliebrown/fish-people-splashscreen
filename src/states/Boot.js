import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    // Setup dynamic scalling to fill page
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL // or EXACT_FIT
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.scale.refresh()

    this.stage.backgroundColor = '#3d4d41'
  }

  preload () {
    this.load.spritesheet('splashAnim', './assets/sheet.png', 1280, 720)

    // Background Music (should already be cached)
    this.load.audioSprite('sound', [
      'assets/soundsprite.ogg', 'assets/soundsprite.mp3',
      'assets/soundsprite.m4a', 'assets/soundsprite.ac3'
    ], 'assets/soundsprite.json')
  }

  create() {
    this.sound = this.game.add.audioSprite('sound')
    this.splashAnim = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY,
      'splashAnim')
    this.splashAnim.anchor.setTo(0.5)

    this.splashAnim.animations.add('walk-out', [0, 1, 2, 3, 4, 5, 6, 7], 7, false)
    this.splashAnim.animations.add('fade', [8, 9, 10, 11], 15, false)

    this.splashAnim.animations.getAnimation('fade').onComplete.add(() => {
      setTimeout(() => {
        this.game.world.camera.fade(0x3d4d41, 500)

        // Redirect window after fade
        if(window.dest !== undefined) {
          setTimeout(() => { window.location = window.dest }, 1500)
        }
      }, 2500)
    })

    this.splashAnim.animations.getAnimation('walk-out').onComplete.add(() => {
      setTimeout(() => {
        // Fade camera out
        this.splashAnim.animations.play('fade')
      }, 1500)
    })

    this.startAnimation()
  }

  update() {
  }

  startAnimation() {
    this.splashAnim.frame = 0
    this.game.world.camera.resetFX()
    setTimeout(() => {
      this.splashAnim.animations.play('walk-out')
    }, 2000)
    this.sound.play('waterSounds')
  }
}
