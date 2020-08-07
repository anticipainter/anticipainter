import {range} from "../util/math-util.js";
import Wave from "./wave.js";

/**
 * Range {@link Wave} with a range of values for each attribute
 * @class WaveRange
 */
export default class WaveRange extends Wave {
	// region Properties
	/**
	 * Range for the scan distance
	 * @type {IntRange}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	scanDistance
	/**
	 * Range for the {@link Sequence} length
	 * @type {IntRange}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	sequenceLength
	/**
	 * Range for the {@link Sequence} interval
	 * @type {IntRange}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	sequenceInterval
	/**
	 * Range for the {@link Sequence} timing
	 * @type {IntRange}
	 *
	 * @memberOf Wave
	 * @instance
	 * @private
	 */
	sequenceTiming
	// endregion

	/**
	 * Create a new {@link Wave} with [ranges]{@link IntRange}
	 * @param {IntRange} scanDistance
	 * @param {IntRange} sequenceInterval
	 * @param {IntRange} sequenceLength
	 * @param {IntRange} sequenceTiming
	 */
	constructor(scanDistance, sequenceInterval, sequenceLength, sequenceTiming) {
		super();
		this.scanDistance = scanDistance
		this.sequenceLength = sequenceLength
		this.sequenceInterval = sequenceInterval
		this.sequenceTiming = sequenceTiming
	}

	getScanDistance() {
		return range(this.scanDistance.min, this.scanDistance.max);
	}

	getSequenceLength() {
		return range(this.sequenceLength.min, this.sequenceLength.max);
	}

	getSequenceInterval() {
		return range(this.sequenceInterval.min, this.sequenceInterval.max);
	}

	getSequenceTiming() {
		return range(this.sequenceTiming.min, this.sequenceTiming.max);
	}

	getWallTypeAt(position, direction) {
		return undefined;
	}
}
