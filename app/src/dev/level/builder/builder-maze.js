import Vector from "../../util/vector.js"
import Direction from "../../util/direction.js"
import Shape from "./shape.js"
import Stage from "../stage.js"

/**
 * Helper class for generating the maze [Walls]{@link Wall}
 * @class MazeBuilder
 */
export default class MazeBuilder {
	// region Properties
	/**
	 * Reference to the stage
	 * @type {Stage}
	 *
	 * @memberOf MazeBuilder
	 * @instance
	 */
	stage
	/**
	 * [Position]{@link Vector} of the top left corner of the {@link Stage}
	 * @type {Vector}
	 *
	 * @memberOf MazeBuilder
	 * @instance
	 */
	origin
	/**
	 * Queue of shapes to draw
	 * @type {Shape[]}
	 *
	 * @memberOf MazeBuilder
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
	 * @memberOf MazeBuilder
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
	 * @memberOf MazeBuilder
	 * @instance
	 */
	queueBorder(WallType) {
		this.queue.push(new MazeBorder(WallType))
	}

	/**
	 * Queue a maze on the {@link Stage}
	 * @param WallType
	 *
	 * @memberOf MazeBuilder
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
		// copy tiles from stage to draft
		let workspace = Array(stage.size.y).fill(undefined).map(function() {return Object.assign(Array(stage.size.x).fill(undefined))})
		stage.forEachTile(function(tile) {
			workspace[tile.position.y][tile.position.x] = false
		})
		let initial = true
		while (true) {
			// find the position of an available tile
			let available = []
			stage.size.iterate(function(vector) {
				if (!([true, undefined].includes(workspace[vector.y][vector.x]))) {
					available.push(vector)
				}
			})
			let base = available[Math.floor(Math.random() * available.length)]
			if (base === undefined) break
			let current = base
			if (initial) {
				for (let facing of Direction.all()) stage.setWall(current, facing, this.WallType)
				workspace[current.y][current.x] = true
				initial = false
			} else {
				// draw the path
				while (workspace[current.y][current.x] !== true) {
					// find a direction that points to a valid tile location
					let directions = Direction.all()
					let valid = []
					for (let direction of directions) {
						let scan = Vector.add(current, Direction.toVector(direction))
						if (workspace[scan.y] !== undefined && workspace[scan.y][scan.x] !== undefined) {
							valid.push(direction)
						}
					}
					let direction = valid[Math.floor(Math.random() * valid.length)]
					// move to the next tile
					workspace[current.y][current.x] = direction
					current = Vector.add(current, Direction.toVector(direction))
				}
				// follow the path and place walls
				current = base
				let direction = undefined
				while (workspace[current.y][current.x] !== true) {
					for (let facing of Direction.all()) stage.setWall(current, facing, this.WallType)
					if (direction !== undefined) stage.setWall(current, Direction.inverse(direction), undefined)
					direction = workspace[current.y][current.x]
					workspace[current.y][current.x] = true
					current = Vector.add(current, Direction.toVector(direction))
				}
				if (direction !== undefined) stage.setWall(current, Direction.inverse(direction), undefined)
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
