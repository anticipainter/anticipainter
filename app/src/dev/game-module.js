import GameObject from "./game-object.js";

/**
 * Abstract class for creating game modules
 * @class GameModule
 * @abstract
 *
 * @param {Anticipainter} game - Reference to the game instance
 */
export default class GameModule extends GameObject {
	// region Properties
	/**
	 * Reference to the [game]{@link Anticipainter} instance
	 * @type {Anticipainter}
	 *
	 * @memberOf GameModule
	 * @instance
	 */
	game
	// endregion

	constructor(game) {
		super()
		this.game = game
		this.constructor.subscribeEvents(this)
	}
}
