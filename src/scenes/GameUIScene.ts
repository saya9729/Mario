import { gameEvents } from "../event_handler/EventHandler"
export class GameUIScene extends Phaser.Scene{
    coins: Phaser.GameObjects.Text
    gameTime: Phaser.GameObjects.Text
    constructor(){
        super('GameUIScene')
    }

    create(){
        this.coins=this.add.text(<number>this.game.config.width-200,5,'0')
        this.gameTime=this.add.text(<number>this.game.config.width-100,5,'0')


        gameEvents.on('player_coin_changed', (coins: number) => {
			this.coins.text = coins.toLocaleString()
		})
        gameEvents.on('game_time_changed', (gameTime: number) => {
			this.gameTime.text = Math.round(gameTime*2.5).toLocaleString()
		})

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			gameEvents.off('player_coin_changed')
		})
    }
    
}