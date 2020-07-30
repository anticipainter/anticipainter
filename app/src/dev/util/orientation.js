import Enum from "./enum.js"

/**
 * The Orientation enum
 * @class Orientation
 * @extends Enum
 */
export default class Orientation extends Enum {
	/**
	 * The unset {@link Orientation}
	 * @readonly
	 * @type {Orientation}
	 */
	/**
	 * The UNSET {@link Orientation}
	 * @type {Orientation}
	 * @constant
	 *
	 * @memberOf Orientation
	 */
	static UNSET = new Orientation(-1, "UNSET")
	/**
	 * The HORIZONTAL {@link Orientation}
	 * @type {Orientation}
	 * @constant
	 *
	 * @memberOf Orientation
	 */
	static HORIZONTAL = new Orientation(0, "HORIZONTAL")
	/**
	 * The VERTICAL {@link Orientation}
	 * @type {Orientation}
	 * @constant
	 *
	 * @memberOf Orientation
	 */
	static VERTICAL = new Orientation(1, "VERTICAL")

	/**
	 * Gets the opposite {@link Orientation}
	 * @param {Orientation} orientation
	 * @returns {Orientation}
	 *
	 * @memberOf Orientation
	 */
	static flip(orientation) {
		if (orientation._id === 0) return Orientation.VERTICAL
		if (orientation._id === 1) return Orientation.HORIZONTAL
		return Orientation.UNSET
	}

	/**
	 * Gets a list of all [Orientations]{@link Orientation}
	 * @returns {Orientation[]}
	 *
	 * @memberOf Orientation
	 */
	static all() {
		return [Orientation.HORIZONTAL, Orientation.VERTICAL]
	}

	/**
	 * Gets a random {@link Orientation}
	 * @returns {Orientation}
	 *
	 * @memberOf Orientation
	 */
	static random() {
		return Orientation.all()[Math.floor(Math.random() * 2)]
	}
}
