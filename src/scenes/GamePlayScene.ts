import { Mario } from "../objects/Mario"
export class GamePlayScene extends Phaser.Scene {
    map: Phaser.Tilemaps.Tilemap
    tilesSet: Phaser.Tilemaps.Tileset
    groundLayer: Phaser.Tilemaps.TilemapLayer
    player: Mario
    height: any
    constructor() {
        super('GamePlayScene')
    }
    preload() {
        this.load
            .image('tiles', 'assets/tiles/items.png')
            .tilemapTiledJSON('E1M1', 'assets/maps/E1M1.json')

            .spritesheet('mario_small', 'assets/sprites/mario_small.png', {
                frameWidth: 34,
                frameHeight: 34
            })
    }
    create() {
        this.height = this.game.config.height;
        this.map = this.make.tilemap({
            key: 'E1M1'
        })
        this.tilesSet = this.map.addTilesetImage('obstacles', 'tiles')
        this.groundLayer = this.map.createLayer('ground', this.tilesSet)
        this.groundLayer.setCollisionByProperty({
            collide: true
        })
        
        // //highlight collition
        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // this.groundLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        
        this.player = new Mario({
            scene: this,
            x: 0,
            y: 0,
            texture: 'mario_small'
        })

        this.cameras.main.startFollow(this.player, true)

        this.physics.add.collider(this.player,this.groundLayer)
    }
    update(time: number, delta: number) {
        this.player.update();
    }
}