import Enum from "./enum.js"

/**
 * The Orientation enum
 * @property {Orientation} UNSET
 * @property {Orientation} HORIZONTAL
 * @property {Orientation} VERTICAL
 */
export default class Orientation extends Enum {
	/**
	 * The unset {@link Orientation}
	 * @readonly
	 * @type {Orientation}
	 */
	static UNSET = new Orientation(-1, "UNSET")
	/**
	 * The horizontal {@link Orientation}
	 * @readonly
	 * @type {Orientation}
	 */
	static HORIZONTAL = new Orientation(0, "HORIZONTAL")
	/**
	 * The vertical {@link Orientation}
	 * @readonly
	 * @type {Orientation}
	 */
	static VERTICAL = new Orientation(1, "VERTICAL")

	/**
	 * Gets the opposite {@link Orientation}
	 * @method flip
	 * @param {Orientation} orientation
	 * @returns {Orientation}
	 */
	static flip(orientation) {
		if (orientation._id === 0) return Orientation.VERTICAL
		if (orientation._id === 1) return Orientation.HORIZONTAL
		return Orientation.UNSET
	}

	/**
	 * Gets a list of all [Orientations]{@link Orientation}
	 * @returns {Orientation[]}
	 */
	static all() {
		return [Orientation.HORIZONTAL, Orientation.VERTICAL]
	}

	/**
	 * Gets a random {@link Orientation}
	 * @returns {Orientation}
	 */
	static random() {
		return Orientation.all()[Math.floor(Math.random() * 2)]
	}
}
