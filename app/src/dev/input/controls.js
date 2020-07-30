import GameModule from "../game-module.js";

/**
 * The controls module
 * @class Controls
 * @extends GameModule
 *
 * @param {Anticipainter} game - Reference to the game instance
 */
export default class Controls extends GameModule {
	/**
	 * Keys for moving left
	 * @type {number[]}
	 *
	 * @memberOf Controls
	 */
	static MOVE_LEFT = [37, 65]
	/**
	 * Keys for moving right
	 * @type {number[]}
	 *
	 * @memberOf Controls
	 */
	static MOVE_RIGHT = [39, 68]
	/**
	 * Keys for moving up
	 * @type {number[]}
	 *
	 * @memberOf Controls
	 */
	static MOVE_UP = [38, 87]
	/**
	 * Keys for moving down
	 * @type {number[]}
	 *
	 * @memberOf Controls
	 */
	static MOVE_DOWN = [40, 83]
}