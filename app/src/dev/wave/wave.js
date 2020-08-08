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
	 * @returns {number} time in ms before next {@link Sequence}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceInterval() {}

	/**
	 * Gets how fast the timer should last when speeding up.
	 * Must be a deterministic value in milliseconds
	 * @returns {number} time in ms the timer lasts when sped-up
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSpeedUpDuration() {
		return 750
	}

	/**
	 * Gets the time between moves in a {@link Sequence}
	 * @returns {number} time in ms between {@link Sequence} commands
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceTiming() {
		return 250
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
		let sequenceInterval = this.getSequenceInterval()
		let sequenceLength = this.getSequenceLength()
		console.log(sequenceLength)
		let moves = []
		for (let i = 0; i < sequenceLength; i++) {
			moves.push(Direction.random())
		}
		let sequence = new Sequence(moves, scanDistance, sequenceInterval)
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
