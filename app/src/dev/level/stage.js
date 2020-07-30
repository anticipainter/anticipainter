import Vector from "../util/vector.js"
import Direction from "../util/direction.js"
import Orientation from "../util/orientation.js"

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
 * @class Stage
 */
export default class Stage {
	// region Properties
	/**
	 * The size of the stage
	 * @type {Vector}
	 *
	 * @memberOf Stage
	 * @instance
	 */
	size
	/**
	 * 2d array of [tiles]{@link Tile} on the [stage]{@link Stage}
	 * @type {Tile[][]}
	 *
	 * @memberOf Stage
	 * @instance
	 */
	tiles
	/**
	 * 2d array of horizontal [walls]{@link Wall} on the [stage]{@link Stage}
	 * @type {Wall[][]}
	 *
	 * @memberOf Stage
	 * @instance
	 */
	wallsHorizontal
	/**
	 * 2d array of vertical [walls]{@link Wall} on the [stage]{@link Stage}
	 * @type {Wall[][]}
	 *
	 * @memberOf Stage
	 * @instance
	 */
	wallsVertical
	// endregion

	constructor() {
		this.tiles = []
		this.wallsHorizontal = []
		this.wallsVertical = []
	}

	/**
	 * Initializes the grid to an empty state
	 * @param {Vector} size
	 *
	 * @memberOf Stage
	 * @instance
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
	 * @param {Vector} position - The desired position
	 * @returns {Tile|undefined} The tile at position, or undefined
	 *
	 * @memberOf Stage
	 * @instance
	 */
	getTile(position) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		return this.tiles[position.y][position.x]
	}

	/**
	 * Sets the {@link Tile} at a specific [position]{@link Vector}
	 * @param {Vector} position - The desired position
	 * @param {Class<Tile>} TileType - The TileType
	 * @returns {Tile|undefined} The previous tile at position, or undefined
	 *
	 * @memberOf Stage
	 * @instance
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
	 * Gets the {@link Wall} relative to a [position]{@link Vector}
	 * @param {Vector} position - the desired position
	 * @param {Direction} direction - the desired direction
	 * @returns {Vector} - relative [position]{@link Vector}
	 *
	 * @memberOf Stage
	 * @instance
	 */
	getWallPosFromDir(position, direction) {
		let orientation = Direction.toOrientation(direction)
		let pos = position
		if (Direction.equal(direction, Direction.RIGHT) || Direction.equal(direction, Direction.DOWN)) {
			pos = Vector.add(pos, Direction.toVector(direction))
		}
		return pos
	}

	/**
	 * Gets the {@link Wall} at a specific [position]{@link Vector} and {@link Direction}
	 * @param {Vector} position - the desired position
	 * @param {Direction} direction - the desired direction
	 * @returns {Wall|undefined} The wall at position, or undefined
	 *
	 * @memberOf Stage
	 * @instance
	 */
	getWall(position, direction) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		let orientation = Direction.toOrientation(direction)
		let pos = this.getWallPosFromDir(position, direction)
		if (Orientation.equal(orientation, Orientation.HORIZONTAL)) {
			return this.getWallHorizontal(pos)
		}
		if (Orientation.equal(orientation, Orientation.VERTICAL)) return this.getWallVertical(pos)
	}

	/**
	 * Sets the {@link Wall} from a {@link Direction} at a specific [position]{@link Vector}
	 * @param {Vector} position - The desired position
	 * @param {Direction} direction - The desired direction
	 * @param {Class<Wall>} WallType - The WallType
	 * @returns {Wall|undefined} The previous wall at position, or undefined
	 *
	 * @memberOf Stage
	 * @instance
	 */
	setWall(position, direction, WallType) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		let orientation = Direction.toOrientation(direction)
		let pos = this.getWallPosFromDir(position, direction)
		let wall
		if (WallType !== undefined) {
			wall = new WallType()
			wall.setOrientation(orientation)
			wall.position = pos
		}
		let old = this.getWall(position, direction)
		if (Orientation.equal(orientation, Orientation.HORIZONTAL)) this.wallsHorizontal[pos.y][pos.x] = wall
		if (Orientation.equal(orientation, Orientation.VERTICAL)) this.wallsVertical[pos.y][pos.x] = wall
		return old
	}

	/**
	 * Gets the horizontal {@link Wall} at a specific [position]{@link Vector}
	 * @param {Vector} position - The desired position
	 * @returns {Wall|undefined} The wall at position, or undefined
	 *
	 * @memberOf Stage
	 * @instance
	 */
	getWallHorizontal(position) {
		if (position.x < 0 || position.x >= this.size.x) return undefined
		if (position.y < 0 || position.y >= this.size.y + 1) return undefined
		return this.wallsHorizontal[position.y][position.x]
	}

	/**
	 * Gets the vertical {@link Wall} at a specific [position]{@link Vector}
	 * @param {Vector} position - The desired position
	 * @returns {Wall|undefined} The wall at position, or undefined
	 *
	 * @memberOf Stage
	 * @instance
	 */
	getWallVertical(position) {
		if (position.x < 0 || position.x >= this.size.x + 1) return undefined
		if (position.y < 0 || position.y >= this.size.y) return undefined
		return this.wallsVertical[position.y][position.x]
	}

	/**
	 * Runs a [function]{@link TileCallback} over each {@link Tile}
	 * @param {TileCallback} callback
	 *
	 * @memberOf Stage
	 * @instance
	 */
	forEachTile(callback) {
		this.size.iterate(vector => {
			let tile = this.getTile(vector)
			if (tile !== undefined) callback(tile)
		})
	}

	/**
	 * Runs a [function]{@link WallCallback} over each {@link Wall}
	 * @param {WallCallback} callback
	 *
	 * @memberOf Stage
	 * @instance
	 */
	forEachWall(callback) {
		this.forEachWallHorizontal(callback)
		this.forEachWallVertical(callback)
	}

	/**
	 * Runs a [function]{@link WallCallback} over each horizontal {@link Wall}
	 * @param {WallCallback} callback
	 *
	 * @memberOf Stage
	 * @instance
	 */
	forEachWallHorizontal(callback) {
		Vector.add(this.size, new Vector(1, 1)).iterate(vector => {
			let wall = this.getWallHorizontal(vector)
			if (wall !== undefined) callback(wall)
		})
	}

	/**
	 * Runs a [function]{@link WallCallback} over each vertical {@link Wall}
	 * @param {WallCallback} callback
	 *
	 * @memberOf Stage
	 * @instance
	 */
	forEachWallVertical(callback) {
		Vector.add(this.size, new Vector(1, 1)).iterate(vector => {
			let wall = this.getWallVertical(vector)
			if (wall !== undefined) callback(wall)
		})
	}
}
