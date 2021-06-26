import { PreloadScene } from './scenes/PreloadScene';
import { GamePlayScene } from './scenes/GamePlayScene'
import { GameUIScene } from './scenes/GameUIScene';
export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Mario',
  width: 400,
  height: 250,
  type: Phaser.AUTO,
  scene: [
    PreloadScene,
    GamePlayScene,
    GameUIScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug:false
    }
  },
  pixelArt: true,
  transparent: true,
  scale:{
    zoom: 2
  }
};
