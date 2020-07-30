/**
 * Abstract shape class used to draw [tiles]{@link Tile} to the {@link Stage}
 * @class Shape
 * @abstract
 */
export default class Shape {
	/**
	 * Draws the shape to the grid
	 * @abstract
	 * @param {Stage} stage
	 * @param {Vector} origin
	 *
	 * @memberOf Shape
	 * @instance
	 */
	draw(stage, origin) {}
}
