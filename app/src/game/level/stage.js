import {Orientation} from "../util.js";
import {Vector} from "../vector.js";

/**
 * @callback TileCallback
 * @param {Tile} tile
 */
/**
 * @callback WallCallback
 * @param {Wall} wall
 */

/**
 * The tiles and walls on a level
 */
export default class Stage {
	/**
	 * The size of the stage
	 * @property size
	 * @type {Vector}
	 */
	size
	/**
	 * 2d array of [tiles]{@link Tile} on the [stage]{@link Stage}
	 * @property tiles
	 * @type {Tile[][]}
	 */
	tiles
	/**
	 * 2d array of horizontal [walls]{@link Wall} on the [stage]{@link Stage}
	 * @property wallsHorizontal
	 * @type {Wall[][]}
	 */
	wallsHorizontal
	/**
	 * 2d array of vertical [walls]{@link Wall} on the [stage]{@link Stage}
	 * @property wallsVertical
	 * @type {Wall[][]}
	 */
	wallsVertical

	constructor() {
		this.tiles = []
		this.wallsHorizontal = []
		this.wallsVertical = []
	}

	/**
	 * Initializes the grid to an empty state
	 * @method generateEmptyGrid
	 * @param {Vector} size
	 */
	generateEmptyGrid(size) {
		this.size = size
		this.tiles.length = 0
		this.wallsHorizontal.length = 0
		this.wallsVertical.length = 0
		for (let y = 0; y <= this.size.y; y++) {
			let tiles = [], wallsHorizontal = [], wallsVertical = []
			for (let x = 0; x <= this.size.x; x++) {
				if (x && y) tiles.push(undefined)
				if (x) wallsHorizontal.push(undefined)
				wallsVertical.push(undefined)
			}
			if (y) this.tiles.push(tiles)
			this.wallsHorizontal.push(wallsHorizontal)
			if (y) this.wallsVertical.push(wallsVertical)
		}
	}

	/**
	 * Gets the {@link Tile} at a specific [position]{@link Vector}
	 * @method getTile
	 * @param {Vector} position - The desired position
	 * @returns {Tile|undefined} The tile at position, or undefined
	 */
	getTile(position) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		return this.tiles[position.y][position.x]
	}

	/**
	 * Sets the {@link Tile} at a specific [position]{@link Vector}
	 * @method getTile
	 * @param {Vector} position - The desired position
	 * @param {Class<Tile>} TileType - The TileType
	 * @returns {Tile|undefined} The previous tile at position, or undefined
	 */
	setTile(position, TileType) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		let tile
		if (TileType !== undefined) {
			tile = new TileType()
			tile.position = position
		}
		let old = this.getTile(position)
		this.tiles[position.y][position.x] = tile
		return old
	}

	/**
	 * Gets the {@link Wall} at a specific [position]{@link Vector} and [orientation]{@link Orientation}
	 * @method getWall
	 * @param {Vector} position - the desired position
	 * @param {Orientation} orientation - the desired orientation
	 * @returns {Wall|undefined} The wall at position, or undefined
	 */
	getWall(position, orientation) {
		if (position.x < 0 || position.x >= this.size.x + (orientation === Orientation.VERTICAL ? 1 : 0)) return
		if (position.y < 0 || position.y >= this.size.y + (orientation === Orientation.HORIZONTAL ? 1 : 0)) return
		if (orientation === Orientation.VERTICAL) return this.getWallVertical(position)
		else if (orientation === Orientation.HORIZONTAL) return this.getWallVertical(position)
	}

	/**
	 * Gets the horizontal {@link Wall} at a specific [position]{@link Vector}
	 * @method getWallHorizontal
	 * @param {Vector} position - The desired position
	 * @returns {Wall|undefined} The wall at position, or undefined
	 */
	getWallHorizontal(position) {
		if (position.x < 0 || position.x >= this.size.x + 1) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		return this.wallsHorizontal[position.y][position.x]
	}

	/**
	 * Gets the vertical {@link Wall} at a specific [position]{@link Vector}
	 * @method getWallHorizontal
	 * @param {Vector} position - The desired position
	 * @returns {Wall|undefined} The wall at position, or undefined
	 */
	getWallVertical(position) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y + 1) return undefined
		return this.wallsVertical[position.y][position.x]
	}

	/**
	 * Runs a [function]{@link TileCallback} over each {@link Tile}
	 * @method forEachTile
	 * @param {TileCallback} callback
	 */
	forEachTile(callback) {
		this.size.iterate(vector => {
			let tile = this.getTile(vector)
			if (tile !== undefined) callback(tile)
		})
	}

	/**
	 * Runs a [function]{@link WallCallback} over each {@link Wall}
	 * @method forEachWall
	 * @param {WallCallback} callback
	 */
	forEachWall(callback) {
		this.forEachWallHorizontal(callback)
		this.forEachWallVertical(callback)
	}

	/**
	 * Runs a [function]{@link WallCallback} over each horizontal {@link Wall}
	 * @method forEachWallHorizontal
	 * @param {WallCallback} callback
	 */
	forEachWallHorizontal(callback) {
		this.size.iterate(vector => {
			let wall = this.getWallHorizontal(vector)
			if (wall !== undefined) callback(wall)
		})
	}

	/**
	 * Runs a [function]{@link WallCallback} over each vertical {@link Wall}
	 * @method forEachWallVertical
	 * @param {WallCallback} callback
	 */
	forEachWallVertical(callback) {
		this.size.iterate(vector => {
			let wall = this.getWallVertical(vector)
			if (wall !== undefined) callback(wall)
		})
	}
}

/**
 * Helper class for drawing [tiles]{@link Tile} to the {@link Stage}
 * @class StageBuilder
 */
export class StageBuilder {
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

	/**
	 * @constructor Helper
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
	 * Queues a rectangle using the given tile type
	 * @method drawRect
	 * @param {Class<TileOld>} TileType - The type of tile to use
	 * @param {Vector} a - The first corner
	 * @param {Vector} b - The cater corner
	 */
	queueRect(TileType, a, b) {
		let min = Vector.min(a, b), max = Vector.max(a, b)
		this.updateBounds(min, max)
		this.queue.push(new Rect(TileType, min, max))
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
		this.queue.push(new ClearRect(min, max))
	}

	/**
	 * Draw all of the queued shapes to the grid
	 * @method draw
	 */
	draw() {
		this.stage.generateEmptyGrid(Vector.add(Vector.sub(this.bottomRight, this.topLeft), Vector.one()))
		for (let shape of this.queue) {
			shape.draw(this.stage, this.topLeft)
		}
	}
}

/**
 * Abstract shape class used to draw [tiles]{@link Tile} to the {@link Stage}
 * @class Shape
 * @abstract
 */
class Shape {
	/**
	 * Draws the shape to the grid
	 * @method draw
	 * @abstract
	 * @param {Stage} stage
	 * @param {Vector} origin
	 */
	draw(stage, origin) {}
}
class Rect extends Shape {
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
class ClearRect extends Rect {
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
