import Wave from "./wave.js";

/**
 * Standard {@link Wave} with set values for each attribute
 * @class WaveStandard
 */
export default class WaveStandard extends Wave {
	// region Properties
	/**
	 * The scan distance
	 * @type {number}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	scanDistance
	/**
	 * The {@link Sequence} length
	 * @type {number}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	sequenceLength
	/**
	 * The {@link Sequence} interval
	 * @type {number}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	sequenceInterval
	/**
	 * The {@link Sequence} timing
	 * @type {number}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	sequenceTiming
	// endregion

	/**
	 * Create a new standard {@link Wave}
	 * @param {number} scanDistance
	 * @param {number} sequenceInterval
	 * @param {number} sequenceLength
	 * @param {number} sequenceTiming
	 */
	constructor(scanDistance, sequenceInterval, sequenceLength, sequenceTiming) {
		super();
		this.scanDistance = scanDistance
		this.sequenceLength = sequenceLength
		this.sequenceInterval = sequenceInterval
		this.sequenceTiming = sequenceTiming
	}

	getScanDistance() {
		return this.scanDistance;
	}

	getSequenceLength() {
		return this.sequenceLength;
	}

	getSequenceInterval() {
		return this.sequenceInterval;
	}

	getSequenceTiming() {
		return this.sequenceTiming
	}

	getWallTypeAt(position, direction) {
		return undefined;
	}
}
