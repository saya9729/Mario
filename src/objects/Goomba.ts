export class Goomba extends Phaser.GameObjects.Sprite {
    runSpeed: number
    body: Phaser.Physics.Arcade.Body
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame)
        
        this.setDepth(1)

        this.initAnimations()

        this.anims.play('goomba_run_anim')
        
        this.runSpeed = 100
    }

    initAnimations() {
        this.anims.create({
            key: 'goomba_run_anim',
            frames: this.anims.generateFrameNames('textures', { start: 1, end: 2, prefix: 'goomba_run_', suffix: '.png' }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'goomba_death_anim',
            frames: [{ key: 'textures', frame: 'goomba_death.png' }]
        })
    }
}