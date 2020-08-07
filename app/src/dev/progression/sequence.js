/**
 * Class for containing a sequence
 * @class Sequence
 */
export default class Sequence {
	scanDistance
	sequenceLength
	sequenceInterval
	sequenceTiming

	constructor(scanDistance, sequenceLength, sequenceInterval, sequenceTiming) {
		this.scanDistance = scanDistance
		this.sequenceLength = sequenceLength
		this.sequenceInterval = sequenceInterval
		this.sequenceTiming = sequenceTiming
	}
}