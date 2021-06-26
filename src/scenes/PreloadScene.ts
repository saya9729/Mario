export class PreloadScene extends Phaser.Scene{
    preload() {
        this.load
            .image('tiles', 'assets/tiles/tile_bundle.png')
            .tilemapTiledJSON('E1M1', 'assets/maps/E1M1.json')

            .atlas('textures','assets/textures/texture_bundle.png','assets/textures/texture_bundle.json')
            .audio('jump_sound','assets/sounds/jump_sound_effect.mp3')
            .audio('coin_sound','assets/sounds/coin_sound_effect.mp3')
            .audio('break_block_sound','assets/sounds/break_block_sound_effect.mp3')
            .audio('main_theme','assets/sounds/main_theme_overworld.mp3')
    }
    create(){
        this.scene.start('GamePlayScene')
    }
}