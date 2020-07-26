import Enum from "./enum.js"

/**
 * The GameMode enum
 * @property {GameMode} WAITING
 * @property {GameMode} NORMAL
 * @property {GameMode} EXECUTION
 * @property {GameMode} VICTORY
 * @property {GameMode} DEATH
 */
export default class GameMode extends Enum {
	static WAITING = new GameMode(0, "WAITING")
	static NORMAl = new GameMode(1, "NORMAL")
	static EXECUTION = new GameMode(2, "EXECUTION")
	static VICTORY = new GameMode(3, "VICTORY")
	static DEATH = new GameMode(4, "DEATH")
}
