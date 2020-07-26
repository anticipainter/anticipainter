/**
 * Abstract class for creating game modules
 * @class GameModule
 * @abstract
 */
export class GameModule {
	/**
	 * Reference to the [game]{@link Anticipainter} instance
	 * @property game
	 * @type {Anticipainter}
	 */
	game

	/**
	 * @constructor
	 * @param {Anticipainter} game
	 */
	constructor(game) {
		this.game = game
	}
}
