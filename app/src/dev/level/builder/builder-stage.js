import Vector from "../../util/vector.js"
import Shape from "./shape.js"

/**
 * Helper class for drawing [tiles]{@link Tile} to the {@link Stage}
 * @class StageBuilder
 */
export default class StageBuilder {
	// region Properties
	/**
	 * Reference to the stage
	 * @property stage
	 * @type {Stage}
	 */
	stage
	/**
	 * Queue of shapes to draw
	 * @property queue
	 * @type {Shape[]}
	 */
	queue
	/**
	 * Position of top left corner
	 * @property topLeft
	 * @type {Vector}
	 */
	topLeft
	/**
	 * Position of bottom right corner
	 * @property bottomRight
	 * @type {Vector}
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
	 * @method updateBounds
	 * @param {Vector} min
	 * @param {Vector} max
	 */
	updateBounds(min, max) {
		this.topLeft = Vector.min(this.topLeft, min)
		this.bottomRight = Vector.max(this.bottomRight, max)
	}

	/**
	 * Gets the top left corner of the {@link Stage}
	 * @returns {Vector}
	 */
	getOrigin() {
		return this.topLeft
	}

	/**
	 * Queues a rectangle using the given tile type
	 * @method drawRect
	 * @param {Class<Tile>} TileType - The type of tile to use
	 * @param {Vector} a - The first corner
	 * @param {Vector} b - The cater corner
	 */
	queueRect(TileType, a, b) {
		let min = Vector.min(a, b), max = Vector.max(a, b)
		this.updateBounds(min, max)
		this.queue.push(new StageRect(TileType, min, max))
	}

	/**
	 * Clears a rectangle from the grid
	 * @method drawRect
	 * @param {Vector} a - The first corner
	 * @param {Vector} b - The cater corner
	 */
	clearRect(a, b) {
		let min = Vector.min(a, b), max = Vector.max(a, b)
		this.updateBounds(min, max)
		this.queue.push(new StageClearRect(min, max))
	}

	/**
	 * Draw all of the queued shapes to the grid
	 * @method draw
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
