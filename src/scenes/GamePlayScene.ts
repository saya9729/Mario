import { Box } from "../objects/Box"
import { Brick } from "../objects/Brick"
import { Goomba } from "../objects/Goomba"
import { Mario } from "../objects/Mario"
import { gameEvents } from "../event_handler/EventHandler"
export class GamePlayScene extends Phaser.Scene {
    map: Phaser.Tilemaps.Tilemap
    tilesSet: Phaser.Tilemaps.Tileset
    groundLayer: Phaser.Tilemaps.TilemapLayer
    player: Mario 
    goombaLayer: Phaser.Tilemaps.ObjectLayer
    goombas: Phaser.Physics.Arcade.Group
    pipeLayer: Phaser.Tilemaps.TilemapLayer
    boxes: Phaser.Physics.Arcade.Group
    boxLayer: Phaser.Tilemaps.ObjectLayer
    bricks: Phaser.Physics.Arcade.Group
    brickLayer: Phaser.Tilemaps.ObjectLayer
    backgroundLayer: Phaser.Tilemaps.TilemapLayer
    coins: number
    themeSong: Phaser.Sound.BaseSound
    gameTime: number
    constructor() {
        super('GamePlayScene')
    }

    create() {
        this.scene.run('GameUIScene')

        this.themeSong=this.sound.add('main_theme', { volume: 0.2 })
        this.themeSong.play()
        //UI values
        this.coins=0
        this.gameTime=160

        this.map = this.make.tilemap({
            key: 'E1M1'
        })
        this.tilesSet = this.map.addTilesetImage('obstacles', 'tiles')

        this.player = new Mario(
            this,
            0,
            0,
            'textures',
            'mario_small_idle.png'
        )
        //Layer

        this.backgroundLayer = this.map.createLayer('background', this.tilesSet)

        this.groundLayer = this.map.createLayer('ground', this.tilesSet)
        this.groundLayer.setCollisionByProperty({
            collide: true
        })

        this.pipeLayer = this.map.createLayer('pipes', this.tilesSet)
        this.pipeLayer.setCollisionByProperty({
            collide: true
        })

        //Goomba

        this.goombas = this.physics.add.group({
            classType: Goomba,
            gravityY: 2338,
            velocityX: 300,
            immovable: true
        })
        this.goombaLayer = this.map.getObjectLayer('goombas')
        this.goombaLayer.objects.forEach(newGoomba => {
            this.goombas.create(newGoomba.x! + newGoomba.width! / 2, newGoomba.y! - newGoomba.height! / 2, 'textures')
        })
        

        //Box

        this.boxes = this.physics.add.group({
            classType: Box,
            immovable: true
        })
        this.boxLayer = this.map.getObjectLayer('boxes')
        this.boxLayer.objects.forEach(newBox => {
            this.boxes.create(newBox.x! + newBox.width! / 2, newBox.y! - newBox.height! / 2, 'textures')
        })
        

        //Brick

        this.bricks = this.physics.add.group({
            classType: Brick,
            immovable: true
        })
        this.brickLayer = this.map.getObjectLayer('bricks')
        this.brickLayer.objects.forEach(newBrick => {
            this.bricks.create(newBrick.x! + newBrick.width! / 2, newBrick.y! - newBrick.height! / 2, 'textures')
        })
        

        //camera later
        this.cameras.main.startFollow(this.player, true)
        //this.cameras.main.setLerp(1,0)
        this.physics.world.setBoundsCollision(true,false,false,true)

        //collider

        this.physics.add.collider(this.player, this.goombas,this.handleGoombaPlayerCollide,undefined,this)
        this.physics.add.collider(this.player, this.boxes, this.handleBoxCollide, undefined, this)
        this.physics.add.collider(this.player, this.bricks, this.handleBrickCollide, undefined, this)

        this.physics.add.collider(this.player, this.groundLayer)
        this.physics.add.collider(this.goombas, this.groundLayer)

        
        this.physics.add.collider(this.player, this.pipeLayer)
        this.physics.add.collider(this.goombas, this.pipeLayer, this.handleGoombaPipeCollide, undefined, this)
    }

    handleBoxCollide(player: any, box: any) {
        if (box.body.touching.down){
            this.coins+=box.open()
            gameEvents.emit('player_coin_changed',this.coins)
        }
    }

    handleGoombaPipeCollide(goomba: any) {
        goomba.runSpeed = -goomba.runSpeed
        goomba.body.setVelocityX(goomba.runSpeed)
    }

    handleBrickCollide(player: any, brick: any) {
        if (brick.body.touching.down) {
            brick.break_brick()
            this.bricks.remove(brick, true)
        }
    }

    handleGoombaPlayerCollide(player: any, goomba: any) {
        if (goomba.body.touching.up) {
            goomba.anims.play('goomba_death_anim')
            goomba.body.setVelocityX(0)
            player.body.setVelocityY(-300)
            goomba.scene.physics.world.disable(goomba)
            this.time.delayedCall(1000,()=>{
                this.goombas.remove(goomba, true)
            })
        }
        else {
            //player point +100
        }
    }

    update(time: number, delta: number) {
        this.player.update()
        this.gameTime-=delta/1000
        gameEvents.emit('game_time_changed',this.gameTime)
        // this.goombas.getChildren().forEach(goomba=>{
        //     goomba.update()
        // })
    }
}