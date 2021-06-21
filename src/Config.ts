import { GamePlayScene } from './scenes/GamePlayScene'
export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Mario',
  width: 400,
  height: 250,
  type: Phaser.AUTO,
  scene: [
    GamePlayScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug:true
    }
  },
  pixelArt: true,
  transparent: true,
  scale:{
    zoom: 2
  }
};
