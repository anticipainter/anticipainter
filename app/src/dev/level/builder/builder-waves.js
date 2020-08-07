/**
 * Helper class for adding [Waves]{@link Wave}
 * @class WaveBuilder
 */
export default class WaveBuilder {
	/**
	 * Container for all of the [Waves]{@link Wave}
	 * @type {Map<number, Wave>}
	 *
	 * @memberOf WaveBuilder
	 * @instance
	 * @private
	 */
	waves = new Map()

	/**
	 * Adds a {@link Wave} to the level based on a threshold
	 * @param threshold
	 * @param wave
	 *
	 * @memberOf WaveBuilder
	 * @instance
	 */
	add(threshold, wave) {
		this.waves.set(threshold, wave)
	}

	/**
	 * Removes a {@link Wave} from the level based on a threshold
	 * @param threshold
	 * @return {boolean}
	 *
	 * @memberOf WaveBuilder
	 * @instance
	 */
	remove(threshold) {
		return this.waves.delete(threshold)
	}

	/**
	 * Gets the current number of [Waves]{@link Wave}
	 * @return {number}
	 *
	 * @memberOf WaveBuilder
	 * @instance
	 */
	get length() {
		return this.waves.size
	}

	/**
	 * Gets the sorted map of [Waves]{@link Wave}
	 * @param {WaveBuilder} builder
	 * @return {Map<number, waves>}
	 *
	 * @memberOf WaveBuilder
	 */
	static getSorted(builder) {
		return new Map([...builder.waves.entries()].sort())
	}
}
