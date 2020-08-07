import Direction from "../util/direction.js";

/**
 * Class for containing a sequence
 * @class Sequence
 */
export default class Sequence {
	/**
	 * List of [moves]{@link Direction}
	 * @type {Direction[]}
	 *
	 * @memberOf Sequence
	 * @instance
	 */
	moves
	/**
	 * Length of this {@link Sequence}
	 * @type {number}
	 *
	 * @memberOf Sequence
	 * @instance
	 */
	length
	/**
	 * Distance from the {@link Player} to the start of this {@link Sequence}
	 * @type {number}
	 *
	 * @memberOf Sequence
	 * @instance
	 */
	scanDistance
	/**
	 * Time between this {@link Sequence} and the last one in ms
	 * @type {number}
	 *
	 * @memberOf Sequence
	 * @instance
	 */
	delay
	/**
	 * Time this {@link Sequence} is scheduled to start
	 * @type {number}
	 */
	timeStart

	constructor(moves, scanDistance, delay) {
		this.moves = moves
		this.length = this.moves.length
		this.scanDistance = scanDistance
		this.delay = delay
	}

	initialize() {
		this.timeStart = Date.now() + this.delay
	}
}