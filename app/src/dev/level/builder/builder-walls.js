import Vector from "../../util/vector.js"
import Direction from "../../util/direction.js"
import Shape from "./shape.js"
import Stage from "../stage.js"

/**
 * Helper class for generating the maze [Walls]{@link Wall}
 * @class WallBuilder
 */
export default class WallBuilder {
	// region Properties
	/**
	 * Reference to the stage
	 * @type {Stage}
	 *
	 * @memberOf WallBuilder
	 * @instance
	 */
	stage
	/**
	 * [Position]{@link Vector} of the top left corner of the {@link Stage}
	 * @type {Vector}
	 *
	 * @memberOf WallBuilder
	 * @instance
	 */
	origin
	/**
	 * Queue of shapes to draw
	 * @type {Shape[]}
	 *
	 * @memberOf WallBuilder
	 * @instance
	 */
	queue
	// endregion

	/**
	 * @constructor MazeBuilder
	 * @param {Stage} stage
	 * @param {Vector} origin
	 */
	constructor(stage, origin) {
		this.stage = stage
		this.origin = origin
		this.queue = []
	}

	/**
	 * Draw all of the queued shapes to the grid
	 *
	 * @memberOf WallBuilder
	 * @instance
	 */
	draw() {
		for (let shape of this.queue) {
			shape.draw(this.stage, this.origin)
		}
	}

	/**
	 * Queue a border around all the [Tiles]{@link Tile} on the {@link Stage}
	 * @param WallType
	 *
	 * @memberOf WallBuilder
	 * @instance
	 */
	queueBorder(WallType) {
		this.queue.push(new MazeBorder(WallType))
	}

	/**
	 * Queue a maze on the {@link Stage}
	 * @param WallType
	 *
	 * @memberOf WallBuilder
	 * @instance
	 */
	queueMaze(WallType) {
		this.queue.push(new Maze(WallType))
	}
}

class Maze extends Shape {
	constructor(WallType) {
		super()
		this.WallType = WallType
	}

	draw(stage, origin) {
		// copy tiles from stage to workspace
		let workspace = Array(stage.size.y).fill(undefined).map(function() {return Object.assign(Array(stage.size.x).fill(undefined))})
		stage.forEachTile(function(tile) {
			workspace[tile.position.y][tile.position.x] = false
		})
		// use workspace to divide stage into zones
		// false = not yet assigned to zone, true = assigned to zone
		let zones = []
		let zone
		function trace(vector) {
			workspace[vector.y][vector.x] = true
			zone[vector.y][vector.x] = false
			for (let direction of Direction.all()) {
				let scan = Vector.add(vector, Direction.toVector(direction))
				if (scan.x >= 0 && scan.y >= 0 && scan.x < stage.size.x && scan.y < stage.size.y && workspace[scan.y][scan.x] === false) {
					trace(scan)
				}
			}
		}
		stage.size.iterate(function(vector) {
			if (workspace[vector.y][vector.x] === false) {
				zone = Array(stage.size.y).fill(undefined).map(function() {return Object.assign(Array(stage.size.x).fill(undefined))})
				trace(vector)
				zones.push(zone)
			}
		})
		// generate maze for each zone
		// false = not yet used for generation, true = used for generation
		for (let zone of zones) {
			let initial = true
			while (true) {
				// find the position of an available tile
				let available = []
				stage.size.iterate(function (vector) {
					if (!([true, undefined].includes(zone[vector.y][vector.x]))) {
						available.push(vector)
					}
				})
				let base = available[Math.floor(Math.random() * available.length)]
				if (base === undefined) break // if there are no tiles left to select, algorithm ends
				let current = base
				if (initial) {
					for (let facing of Direction.all()) stage.setWall(current, facing, this.WallType)
					zone[current.y][current.x] = true
					initial = false
				} else {
					// draw the path
					while (zone[current.y][current.x] !== true) {
						// find a direction that points to a valid tile location
						let directions = Direction.all()
						let valid = []
						for (let direction of directions) {
							let scan = Vector.add(current, Direction.toVector(direction))
							if (zone[scan.y] !== undefined && zone[scan.y][scan.x] !== undefined) {
								valid.push(direction)
							}
						}
						let direction = valid[Math.floor(Math.random() * valid.length)]
						// move to the next tile
						zone[current.y][current.x] = direction
						current = Vector.add(current, Direction.toVector(direction))
					}
					// follow the path and place walls
					current = base
					let direction = undefined
					while (zone[current.y][current.x] !== true) {
						for (let facing of Direction.all()) stage.setWall(current, facing, this.WallType)
						if (direction !== undefined) stage.setWall(current, Direction.inverse(direction), undefined)
						direction = zone[current.y][current.x]
						zone[current.y][current.x] = true
						current = Vector.add(current, Direction.toVector(direction))
					}
					if (direction !== undefined) stage.setWall(current, Direction.inverse(direction), undefined)
				}
			}
		}
	}
}

class MazeBorder extends Shape {
	/**
	 * @constructor MazeBorder
	 * @param {Class<Wall>} WallType
	 */
	constructor(WallType) {
		super()
		this.WallType = WallType
	}

	draw(stage, origin) {
		stage.forEachTile(function(tile) {
			let adjacent = {
				left: stage.getTile(Vector.add(tile.position, Direction.toVector(Direction.LEFT))),
				right: stage.getTile(Vector.add(tile.position, Direction.toVector(Direction.RIGHT))),
				up: stage.getTile(Vector.add(tile.position, Direction.toVector(Direction.UP))),
				down: stage.getTile(Vector.add(tile.position, Direction.toVector(Direction.DOWN)))
			}
			if (adjacent.left === undefined) stage.setWall(tile.position, Direction.LEFT, this.WallType)
			if (adjacent.right === undefined) stage.setWall(tile.position, Direction.RIGHT, this.WallType)
			if (adjacent.up === undefined) stage.setWall(tile.position, Direction.UP, this.WallType)
			if (adjacent.down === undefined) stage.setWall(tile.position, Direction.DOWN, this.WallType)
		}.bind(this))
	}
}
