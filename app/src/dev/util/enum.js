/**
 * Abstract Enum class
 * @class Enum
 * @abstract
 */
export default class Enum {
	constructor(id, name) {
		this._id = id
		this._name = name
	}

	/**
	 * If both [Enums]{@link Enum} are equal
	 * @param {Enum} a
	 * @param {Enum} b
	 * @returns {boolean}
	 *
	 * @memberOf Enum
	 */
	static equal(a, b) {
		return a._id === b._id
	}

	/**
	 * Gets the id of an {@link Enum}
	 * @param {Enum} value
	 * @returns {number}
	 *
	 * @memberOf Enum
	 */
	static valueOf(value) {
		return value._id
	}

	/**
	 * Converts an {@link Enum} to a {@link string}
	 * @param {Enum} value
	 * @returns {string}
	 *
	 * @memberOf Enum
	 */
	static toString(value) {
		return value._name
	}
}
