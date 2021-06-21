import { SpriteConstructor } from "../constructor/SpriteConstructor";
export class Mario extends Phaser.GameObjects.Sprite {
    //direction: any;
    body: Phaser.Physics.Arcade.Body;
    runSpeed: number;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(params: SpriteConstructor) {
        super(params.scene, params.x, params.y, params.texture, params.frame);

        // variables
        this.runSpeed = 300

        // image
        this
            .setOrigin(0, 1)
            .setDepth(1)
            .scene.add.existing(this);

        // physics
        this.scene.physics.world.enable(this)
        this.body
            .setGravityY(2338)
            //.setCollideWorldBounds(true)

        this.cursors=this.scene.input.keyboard.createCursorKeys()
        // this.direction = this.scene.input.keyboard.addKeys({
        //     'up': Phaser.Input.Keyboard.KeyCodes.UP,
        //     'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
        //     'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
        //     'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
        // })

        this.initAnimations();
    }

    initAnimations() {
        this.anims.create({
            key: 'mario_small_run_anim',
            frames: this.anims.generateFrameNumbers('mario_small', { start: 2, end: 5 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'mario_small_idle_anim',
            frames: this.anims.generateFrameNumbers('mario_small', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'mario_small_jump_anim',
            frames: this.anims.generateFrameNumbers('mario_small', { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1
        })

    }

    jump() {
        this.body.setVelocityY(-600)
        this.play('mario_small_jump_anim', true)
    }

    goLeft() {
        //this.body.x -= this.runSpeed * delta / 1000
        this.body.setVelocityX((-1)*this.runSpeed)
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

    update() {
        if (this.body.onFloor() && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.play('mario_small_idle_anim', true)
        }
        if (!this.body.onFloor()){
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
        else{
            this.body.setVelocityX(0)
        }

    }
}
