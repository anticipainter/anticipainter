/**
 * Abstract class for creating game modules
 * @class GameModule
 * @abstract
 *
 * @param {Anticipainter} game - Reference to the game instance
 */
export default class GameModule {
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
		this.game = game
	}
}
