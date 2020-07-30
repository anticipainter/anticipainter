import Enum from "./enum.js"
import Vector from "./vector.js"
import Orientation from "./orientation.js"

/**
 * The Direction enum
 * @class Direction
 * @extends Enum
 */
export default class Direction extends Enum {
	/**
	 * The unset {@link Direction}
	 * @type {Direction}
	 * @constant
	 *
	 * @memberOf Direction
	 */
	static UNSET = new Direction(-1, "UNSET")
	/**
	 * The left {@link Direction}
	 * @type {Direction}
	 * @constant
	 *
	 * @memberOf Direction
	 */
	static LEFT = new Direction(0, "LEFT")
	/**
	 * The right {@link Direction}
	 * @type {Direction}
	 * @constant
	 *
	 * @memberOf Direction
	 */
	static RIGHT = new Direction(1, "RIGHT")
	/**
	 * The up {@link Direction}
	 * @type {Direction}
	 * @constant
	 *
	 * @memberOf Direction
	 */
	static UP = new Direction(2, "UP")
	/**
	 * The down {@link Direction}
	 * @type {Direction}
	 * @constant
	 *
	 * @memberOf Direction
	 */
	static DOWN = new Direction(3, "DOWN")

	/**
	 * Gets the opposite {@link Direction}
	 * @param {Direction} direction
	 * @returns {Direction}
	 *
	 * @memberOf Direction
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
	 * @param {Direction} direction
	 * @returns {Direction}
	 *
	 * @memberOf Direction
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
	 * @param {Direction} direction
	 * @returns {Direction}
	 *
	 * @memberOf Direction
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
	 * @param {Direction} direction
	 * @returns {Vector}
	 *
	 * @memberOf Direction
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
	 * @param {Direction} direction
	 * @returns {Orientation}
	 *
	 * @memberOf Direction
	 */
	static toOrientation(direction) {
		if (direction._id === 0 || direction._id === 1) return Orientation.VERTICAL
		if (direction._id === 2 || direction._id === 3) return Orientation.HORIZONTAL
		return Orientation.UNSET
	}

	/**
	 * Converts a {@link Direction} to an angle measurement
	 * @param {Direction} direction
	 * @returns {number|undefined}
	 *
	 * @memberOf Direction
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
	 * @param {Vector} position
	 * @param {Direction} direction
	 * @returns {Vector}
	 *
	 * @memberOf Direction
	 */
	static getWallCoordinates(position, direction) {
		let offset = new Vector(direction._id === 1 ? 1 : 0, direction._id === 3 ? 1 : 0)
		return Vector.add(position, offset)
	}

	/**
	 * Gets a list of all [Directions]{@link Direction}
	 * @returns {Direction[]}
	 *
	 * @memberOf Direction
	 */
	static all() {
		return [Direction.LEFT, Direction.RIGHT, Direction.UP, Direction.DOWN]
	}

	/**
	 * Gets a random {@link Direction}
	 * @returns {Direction}
	 *
	 * @memberOf Direction
	 */
	static random() {
		return Direction.all()[Math.floor(Math.random() * 4)]
	}
}
