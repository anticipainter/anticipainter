import Entity from "../entity/entity.js"
import Orientation from "../util/orientation.js"

/**
 * Abstract Wall class for creating walls
 * @class Wall
 * @abstract
 */
export default class Wall extends Entity {
	/**
	 * The {@link Orientation} of the {@link Wall}
	 * @type {Orientation}
	 */
	orientation
}
