export class Boy {
    instance: SpineGameObject;
    scene: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    runSpeed: number;
    lives: number;
    scale: number;
    jumpSound: Phaser.Sound.BaseSound;
    constructor(scene: Phaser.Scene, x: number, y: number, key?: string, animationName?: string, loop?: boolean) {
        this.scene = scene
        this.instance = this.scene.add.spine(x, y, key, animationName, loop)

        this.runSpeed = 300
        this.lives = 3

        this.scale=0.05

        this.jumpSound=this.scene.sound.add('jump_sound', { volume: 0.2 })

        this.instance
            .setDepth(1)
            .setScale(this.scale)

        //.setInteractive()

        //physics
        //@ts-ignore
        this.scene.physics.add.existing(this.instance) //better
        //@ts-ignore
        this.instance.body.setGravityY(2338).setCollideWorldBounds()//.setSize(23,23)
        //console.log(this.instance.skeletonData.width,this.instance.skeletonData.height)
        //@ts-ignore
        //console.debug(this.instance.body.width,this.instance.body.height)

        this.cursors = this.scene.input.keyboard.createCursorKeys()

        this.instance.play('run', true, true)
        //console.log(this.instance.getAnimationList())
    }

    setFlipX(flip: boolean) {
        if (flip) {
            //@ts-ignore
            this.instance.body.setOffset(this.instance.body.width/this.scale, 0)
            //@ts-ignore
            //console.log(this.instance.body.width)
            this.instance.setScale(-this.scale, this.scale)
        } else {
            //@ts-ignore
            this.instance.body.setOffset(0, 0)
            this.instance.setScale(this.scale, this.scale)
        }
    }

    jump() {
        //@ts-ignore
        this.instance.body.setVelocityY(-600)
        this.jumpSound.play()
        //this.play('mario_small_jump_anim', true)
        this.instance.play('jump', true, true)
    }

    goLeft() {
        //@ts-ignore
        this.instance.body.setVelocityX(-this.runSpeed)
        //@ts-ignore
        if (this.instance.body.onFloor()) {
            //this.play('mario_small_run_anim', true)
            this.instance.play('run', true, true)
        }
        this.setFlipX(true)
    }


    goRight() {
        //@ts-ignore
        this.instance.body.setVelocityX(this.runSpeed)
        //@ts-ignore
        if (this.instance.body.onFloor()) {
            //this.play('mario_small_run_anim', true)
            this.instance.play('run', true, true)
        }
        this.setFlipX(false)
    }

    hurt() {
        this.lives -= 1

    }

    update() {
        //@ts-ignore
        if (this.instance.body.onFloor() && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            //this.play('mario_small_idle_anim', true)
            this.instance.play('idle', true, true)
        }
        //@ts-ignore
        if (!this.instance.body.onFloor()) {
            //this.play('mario_small_jump_anim', true)
            this.instance.play('jump', true, true)
        }
        //@ts-ignore
        if (this.cursors.up.isDown && this.instance.body.onFloor()) {
            this.jump()
        }
        if (this.cursors.left.isDown) {
            this.goLeft()
        }
        else if (this.cursors.right.isDown) {
            this.goRight()
        }
        else {
            //@ts-ignore
            this.instance.body.setVelocityX(0)
        }

    }
}