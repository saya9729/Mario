export class Brick extends Phaser.GameObjects.Sprite {
    breakSound: Phaser.Sound.BaseSound
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame)

        this.initAnimations()

        this.play('brick_idle_anim')

        this.breakSound = this.scene.sound.add('break_block_sound', { volume: 0.2 })
    }

    initAnimations() {
        this.anims.create({
            key: 'brick_idle_anim',
            frames: [{ key: 'textures', frame: 'brick.png' }]
        })
    }

    break_brick() {
        this.breakSound.play()
        var particle = this.scene.add.particles('textures', 'debris.png')
        var emitter = particle.createEmitter({
            x: this.x,
            y: this.y,
            speedY: { min: -300, max: -400 },
            speedX: { min: -200, max: 200 },
            angle: -90,
            gravityY: 2338,
            maxParticles: 4
        })
    }
}