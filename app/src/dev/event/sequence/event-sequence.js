import BaseEvent from "../event.js";
import Direction from "../../util/direction.js";

export default class EventSequence extends BaseEvent {
	// region Properties
	/**
	 * List of [moves]{@link Direction}
	 * @type {Direction[]}
	 */
	moves
	/**
	 * Length of the {@link Sequence}
	 * @type {number}
	 */
	length
	// endregion

	/**
	 * @param {Direction[]} moves
	 */
	constructor(moves) {
		super()
		this.moves = moves
		this.length = moves.length
	}
}