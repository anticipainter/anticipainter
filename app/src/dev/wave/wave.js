import Sequence from "../progression/sequence.js";
import Direction from "../util/direction.js";
import GameObject from "../game-object.js";

/**
 * Abstract {@link Wave} class for creating [Waves]{@link Wave}
 * @class Wave
 * @abstract
 */
export default class Wave extends GameObject {
	// TODO Call wave events when necessary
	/**
	 * The percent that this {@link Wave} becomes active
	 * @type {number}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	threshold

	/**
	 * Gets the starting distance of the next {@link Sequence}
	 * @abstract
	 * @returns {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getScanDistance() {}

	/**
	 * Gets the length of the next {@link Sequence}
	 * @abstract
	 * @returns {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceLength() {}

	/**
	 * Gets the time between this {@link Sequence} and the next
	 * @abstract
	 * @returns {number} time in seconds before next {@link Sequence}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceInterval() {}

	/**
	 * Gets the time between moves in a {@link Sequence}
	 * @returns {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceTiming() {
		return 0;
	}

	/**
	 * Gets the {@link Wall} type at a given location
	 * @abstract
	 * @param {Vector} position
	 * @param {Direction} direction
	 * @returns {Class<Wall>} {@link Wall} type at a given location
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getWallTypeAt(position, direction) {}

	/**
	 * Make a new {@link Sequence} using this {@link Wave}'s settings
	 * @returns {Sequence} a valid {@link Sequence}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	makeSequence(stage, player) {
		// TODO
		let scanDistance = this.getScanDistance()
		let sequenceLength = this.getSequenceLength()
		let moves = []
		for (let i = 0; i < 4; i++) {
			moves.push(Direction.random())
		}
		let sequence = new Sequence(moves, 0, 5000)
		sequence.initialize()
		return sequence
	}

	/**
	 * Gets the threshold for this {@link Wave}
	 * @return {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getThreshold() {
		return this.threshold
	}

	/**
	 * Sets the threshold for a give {@link Wave}
	 * @param {Wave} wave
	 * @param {number} threshold
	 *
	 * @memberOf Wave
	 */
	static setThreshold(wave, threshold) {
		wave.threshold = threshold
	}
}
