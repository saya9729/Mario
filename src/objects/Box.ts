export class Box extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame)

        this.initAnimations()

        this.anims.play('box_blink_anim')
    }

    initAnimations() {
        this.anims.create({
            key: 'box_blink_anim',
            frames: this.anims.generateFrameNames('textures', { start: 1, end: 3, prefix: 'mystery_box_', suffix: '.png' }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'box_empty_anim',
            frames: [{ key: 'textures', frame: 'mystery_box_empty.png' }]
        })
    }

    open() {
        if (this.anims.currentAnim.key !== 'box_blink_anim')
            return 0
        this.anims.play('box_empty_anim')
        return 100
    }
}