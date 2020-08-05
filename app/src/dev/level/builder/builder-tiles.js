import Vector from "../../util/vector.js"
import Shape from "./shape.js"

/**
 * Helper class for drawing [tiles]{@link Tile} to the {@link Stage}
 * @class TileBuilder
 */
export default class TileBuilder {
	// region Properties
	/**
	 * Reference to the stage
	 * @type {Stage}
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	stage
	/**
	 * Queue of shapes to draw
	 * @type {Shape[]}
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	queue
	/**
	 * Position of top left corner
	 * @type {Vector}
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	topLeft
	/**
	 * Position of bottom right corner
	 * @type {Vector}
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	bottomRight
	// endregion

	/**
	 * @constructor StageBuilder
	 * @param {Stage} stage
	 */
	constructor(stage) {
		this.stage = stage
		this.queue = []
	}

	/**
	 * Updates the bounds of the grid
	 * @param {Vector} min
	 * @param {Vector} max
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	updateBounds(min, max) {
		this.topLeft = Vector.min(this.topLeft, min)
		this.bottomRight = Vector.max(this.bottomRight, max)
	}

	/**
	 * Gets the top left corner of the {@link Stage}
	 * @returns {Vector}
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	getOrigin() {
		return this.topLeft
	}

	/**
	 * Queues a rectangle using the given tile type
	 * @param {Class<Tile>} TileType - The type of tile to use
	 * @param {Vector} a - The first corner
	 * @param {Vector} b - The cater corner
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	queueRect(TileType, a, b) {
		let min = Vector.min(a, b), max = Vector.max(a, b)
		this.updateBounds(min, max)
		this.queue.push(new StageRect(TileType, min, max))
	}

	/**
	 * Clears a rectangle from the grid
	 * @param {Vector} a - The first corner
	 * @param {Vector} b - The cater corner
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	clearRect(a, b) {
		let min = Vector.min(a, b), max = Vector.max(a, b)
		this.updateBounds(min, max)
		this.queue.push(new StageClearRect(min, max))
	}

	/**
	 * Draw all of the queued shapes to the grid
	 *
	 * @memberOf TileBuilder
	 * @instance
	 */
	draw() {
		this.stage.generateEmptyGrid(Vector.add(Vector.sub(this.bottomRight, this.topLeft), Vector.one))
		for (let shape of this.queue) {
			shape.draw(this.stage, this.topLeft)
		}
	}
}

class StageRect extends Shape {
	/**
	 * @constructor Rect
	 * @param {Class<Tile>} TileType - The type of tile to use
	 * @param {Vector} a - The top left corner
	 * @param {Vector} b - The bottom right corner
	 */
	constructor(TileType, a, b) {
		super();
		this.TileType = TileType
		this.a = a
		this.b = b
	}

	draw(stage, origin) {
		let min = Vector.sub(this.a, origin), max = Vector.sub(this.b, origin)
		for (let y = min.y; y <= max.y; y++) {
			for (let x = min.x; x <= max.x; x++) {
				let pos = new Vector(x, y)
				if (stage.getTile(pos) === undefined) stage.setTile(pos, this.TileType)
			}
		}
	}
}
class StageClearRect extends StageRect {
	/**
	 * @constructor ClearRect
	 * @param {Vector} a - The top left corner
	 * @param {Vector} b - The bottom right corner
	 */
	constructor(a, b) {
		super(undefined, a, b);
	}

	draw(stage, origin) {
		let min = Vector.sub(this.a, origin), max = Vector.sub(this.b, origin)
		for (let y = min.y; y <= max.y; y++) {
			for (let x = min.x; x <= max.x; x++) {
				let pos = new Vector(x, y)
				stage.setTile(pos, undefined)
			}
		}
	}
}
