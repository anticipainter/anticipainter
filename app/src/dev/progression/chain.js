import Direction from "../util/direction.js";

/**
 * @class Chain
 */
export default class Chain {
	/**
	 * Reference to the previous link in the {@link Chain}
	 * @type Chain
	 *
	 * @memberOf Chain
	 * @instance
	 */
	previous
	/**
	 * Value at this link in the {@link Chain}
	 * @type {Direction}
	 *
	 * @memberOf Chain
	 * @instance
	 */
	value

	/**
	 * Create a new link off of an existing {@link Chain}
	 * @param {Direction} value
	 * @param {Chain} [previous]
	 */
	constructor(value, previous) {
		this.previous = previous
		this.value = value
	}

	/**
	 * Convert this {@link Chain} into a list
	 * @returns {Direction[]}
	 */
	finalize() {
		if (this.previous === undefined) return [this.value]
		let list = this.previous.finalize()
		list.push(this.value)
		return list
	}
}
