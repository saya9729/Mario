export class Mario extends Phaser.GameObjects.Sprite {
    //direction: any;
    body: Phaser.Physics.Arcade.Body
    runSpeed: number
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    jumpSound: Phaser.Sound.BaseSound
    lives: number
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame)

        // variables
        this.runSpeed = 300
        this.lives=3

        this.jumpSound=this.scene.sound.add('jump_sound', { volume: 0.2 })
        // image
        this
            .setOrigin(0.5, 1)
            .setDepth(1)
            .scene.add.existing(this);

        // physics
        this.scene.physics.world.enable(this)
        this.body
            .setGravityY(2338)
            .setCollideWorldBounds(true)

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        // this.direction = this.scene.input.keyboard.addKeys({
        //     'up': Phaser.Input.Keyboard.KeyCodes.UP,
        //     'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
        //     'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
        //     'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
        // })

        this.initAnimations();

        this.anims.play('mario_small_idle_anim')
    }

    initAnimations() {
        this.anims.create({
            key: 'mario_small_run_anim',
            frames: this.anims.generateFrameNames('textures', { start: 1, end: 4, prefix:'mario_small_run_', suffix:'.png' }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'mario_small_idle_anim',
            frames: [{key: 'textures', frame: 'mario_small_idle.png'}]
        })

        this.anims.create({
            key: 'mario_small_jump_anim',
            frames: [{key: 'textures', frame: 'mario_small_jump.png'}]
        })

    }

    jump() {
        this.body.setVelocityY(-600)
        this.jumpSound.play()
        this.play('mario_small_jump_anim', true)
    }

    goLeft() {
        //this.body.x -= this.runSpeed * delta / 1000
        this.body.setVelocityX(-this.runSpeed)
        if (this.body.onFloor()) {
            this.play('mario_small_run_anim', true)
        }
        this.setFlipX(true)
    }

    goRight() {
        //this.body.x += this.runSpeed * delta / 1000
        this.body.setVelocityX(this.runSpeed)
        if (this.body.onFloor()) {
            this.play('mario_small_run_anim', true)
        }
        this.setFlipX(false)
    }

    hurt(){
        this.lives-=1
        
    }

    update() {
        if (this.body.onFloor() && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.play('mario_small_idle_anim', true)
        }
        if (!this.body.onFloor()) {
            this.play('mario_small_jump_anim', true)
        }
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.jump()
        }
        if (this.cursors.left.isDown) {
            this.goLeft()
        }
        else if (this.cursors.right.isDown) {
            this.goRight()
        }
        else {
            this.body.setVelocityX(0)
        }

    }
}
