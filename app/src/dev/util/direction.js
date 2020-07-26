import Enum from "./enum.js"
import Vector from "./vector.js"
import Orientation from "./orientation.js"

/**
 * The Direction enum
 * @property {Direction} UNSET
 * @property {Direction} LEFT
 * @property {Direction} RIGHT
 * @property {Direction} UP
 * @property {Direction} DOWN
 */
export default class Direction extends Enum {
	/**
	 * The unset {@link Direction}
	 * @readonly
	 * @type {Direction}
	 */
	static UNSET = new Direction(-1, "UNSET")
	/**
	 * The left {@link Direction}
	 * @readonly
	 * @type {Direction}
	 */
	static LEFT = new Direction(0, "LEFT")
	/**
	 * The right {@link Direction}
	 * @readonly
	 * @type {Direction}
	 */
	static RIGHT = new Direction(1, "RIGHT")
	/**
	 * The up {@link Direction}
	 * @readonly
	 * @type {Direction}
	 */
	static UP = new Direction(2, "UP")
	/**
	 * The down {@link Direction}
	 * @readonly
	 * @type {Direction}
	 */
	static DOWN = new Direction(3, "DOWN")

	/**
	 * Gets the opposite {@link Direction}
	 * @method flip
	 * @param {Direction} direction
	 * @returns {Direction}
	 */
	static inverse(direction) {
		if (direction._id === 0) return Direction.RIGHT
		if (direction._id === 1) return Direction.LEFT
		if (direction._id === 2) return Direction.DOWN
		if (direction._id === 3) return Direction.UP
		return Direction.UNSET
	}

	/**
	 * Gets the {@link Direction} one to the left
	 * @method flip
	 * @param {Direction} direction
	 * @returns {Direction}
	 */
	static leftOf(direction) {
		if (direction._id === 0) return Direction.DOWN
		if (direction._id === 1) return Direction.UP
		if (direction._id === 2) return Direction.LEFT
		if (direction._id === 3) return Direction.RIGHT
		return Direction.UNSET
	}

	/**
	 * Gets the {@link Direction} one to the right
	 * @method flip
	 * @param {Direction} direction
	 * @returns {Direction}
	 */
	static rightOf(direction) {
		if (direction._id === 0) return Direction.UP
		if (direction._id === 1) return Direction.DOWN
		if (direction._id === 2) return Direction.RIGHT
		if (direction._id === 3) return Direction.LEFT
		return Direction.UNSET
	}

	/**
	 * Converts a {@link Direction} to a {@link Vector}
	 * @method toVector
	 * @param {Direction} direction
	 * @returns {Vector}
	 */
	static toVector(direction) {
		if (direction._id === 0) return Vector.left
		if (direction._id === 1) return Vector.right
		if (direction._id === 2) return Vector.up
		if (direction._id === 3) return Vector.down
		return Vector.zero
	}

	/**
	 * Converts a {@link Direction} to a {@link Orientation}
	 * @method toOrientation
	 * @param {Direction} direction
	 * @returns {Orientation}
	 */
	static toOrientation(direction) {
		if (direction._id === 0 || direction._id === 1) return Orientation.VERTICAL
		if (direction._id === 2 || direction._id === 3) return Orientation.HORIZONTAL
		return Orientation.UNSET
	}

	/**
	 * Converts a {@link Direction} to an angle measurement
	 * @method toAngle
	 * @param {Direction} direction
	 * @returns {number|undefined}
	 */
	static toAngle(direction) {
		if (direction._id === 0) return 270
		if (direction._id === 1) return 90
		if (direction._id === 2) return 0
		if (direction._id === 3) return 180
		return undefined
	}

	/**
	 * Get the corresponding wall coordinates based on a position and direction
	 * @method getWallCoordinates
	 * @param {Vector} position
	 * @param {Direction} direction
	 * @returns {Vector}
	 */
	static getWallCoordinates(position, direction) {
		let offset = new Vector(direction._id === 1 ? 1 : 0, direction._id === 3 ? 1 : 0)
		return Vector.add(position, offset)
	}

	/**
	 * Gets a list of all [Directions]{@link Direction}
	 * @returns {Direction[]}
	 */
	static all() {
		return [Direction.LEFT, Direction.RIGHT, Direction.UP, Direction.DOWN]
	}

	/**
	 * Gets a random {@link Direction}
	 * @returns {Direction}
	 */
	static random() {
		return Direction.all()[Math.floor(Math.random() * 4)]
	}
}
