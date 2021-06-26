export class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame)

        this.scene.add.existing(this)

        this.initAnimations()

        this.anims.play('coin_spin_anim')
    }

    initAnimations() {
        this.anims.create({
            key: 'coin_spin_anim',
            frames: this.anims.generateFrameNames('textures', { start: 1, end: 4, prefix:'coin_spin_', suffix:'.png' }),
            frameRate: 15,
            repeat: -1
        })
    }
}