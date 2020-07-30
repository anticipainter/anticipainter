import Enum from "./enum.js"

/**
 * The GameMode enum
 * @class GameMode
 * @extends Enum
 */
export default class GameMode extends Enum {
	/**
	 * The WAITING {@link GameMode}
	 * @type {GameMode}
	 * @constant
	 *
	 * @memberOf GameMode
	 */
	static WAITING = new GameMode(0, "WAITING")
	/**
	 * The NORMAL {@link GameMode}
	 * @type {GameMode}
	 * @constant
	 *
	 * @memberOf GameMode
	 */
	static NORMAl = new GameMode(1, "NORMAL")
	/**
	 * The EXECUTION {@link GameMode}
	 * @type {GameMode}
	 * @constant
	 *
	 * @memberOf GameMode
	 */
	static EXECUTION = new GameMode(2, "EXECUTION")
	/**
	 * The VICTORY {@link GameMode}
	 * @type {GameMode}
	 * @constant
	 *
	 * @memberOf GameMode
	 */
	static VICTORY = new GameMode(3, "VICTORY")
	/**
	 * The DEATH {@link GameMode}
	 * @type {GameMode}
	 * @constant
	 *
	 * @memberOf GameMode
	 */
	static DEATH = new GameMode(4, "DEATH")
}
