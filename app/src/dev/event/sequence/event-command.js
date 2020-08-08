import EventSequence from "./event-sequence.js";
import Direction from "../../util/direction.js";

export default class EventCommand extends EventSequence {
	// region Properties
	/**
	 * Index of the current [move]{@link Direction}
	 * @type {number}
	 *
	 * @memberOf EventCommand
	 * @instance
	 */
	index
	/**
	 * {@link Direction} of the current move
	 * @type {Direction}
	 *
	 * @memberOf EventCommand
	 * @instance
	 */
	direction
	// endregion

	/**
	 * @param {Direction[]} moves
	 * @param {number} index
	 */
	constructor(moves, index) {
		super(moves);
		this.index = index
		this.direction = this.moves[this.index]
	}
}