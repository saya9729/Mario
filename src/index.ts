import { GameApp } from './GameApp'
import { GameConfig } from './Config'
window.addEventListener('load', () => {
    const game = new GameApp(GameConfig);
  });