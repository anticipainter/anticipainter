/**
 * Abstract class for creating game modules
 * @class GameModule
 * @abstract
 */
export default class GameModule {
	// region Properties
	/**
	 * Reference to the [game]{@link Anticipainter} instance
	 * @property game
	 * @type {Anticipainter}
	 */
	game
	// endregion

	/**
	 * @constructor
	 * @param {Anticipainter} game
	 */
	constructor(game) {
		this.game = game
	}
}
