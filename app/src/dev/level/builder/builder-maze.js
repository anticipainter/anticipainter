import Vector from "../../util/vector.js"
import Direction from "../../util/direction.js"
import Shape from "./shape.js"

/**
 * Helper class for generating the maze [Walls]{@link Wall}
 * @class MazeBuilder
 */
export default class MazeBuilder {
	// region Properties
	/**
	 * Reference to the stage
	 * @property stage
	 * @type {Stage}
	 */
	stage
	/**
	 * [Position]{@link Vector} of the top left corner of the {@link Stage}
	 * @property origin
	 * @type {Vector}
	 */
	origin
	/**
	 * Queue of shapes to draw
	 * @property queue
	 * @type {Shape[]}
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
	 * @method draw
	 */
	draw() {
		for (let shape of this.queue) {
			shape.draw(this.stage, this.origin)
		}
	}

	queueBorder(WallType) {
		this.queue.push(new MazeBorder(WallType))
	}
}

class Maze extends Shape {
	draw(stage, origin) {
	}
}
class MazeBorder extends Shape {
	/**
	 * @constructor MazeBorder
	 * @param {Class<Wall>} WallType
	 */
	constructor(WallType) {
		super();
		this.WallType = WallType
	}

	draw(stage, origin) {
		stage.size.iterate(vector => {
			let tile = stage.getTile(vector)
			if (tile === undefined) return
			let adjacent = {
				left: stage.getTile(Vector.add(vector, Direction.toVector(Direction.LEFT))),
				right: stage.getTile(Vector.add(vector, Direction.toVector(Direction.RIGHT))),
				up: stage.getTile(Vector.add(vector, Direction.toVector(Direction.UP))),
				down: stage.getTile(Vector.add(vector, Direction.toVector(Direction.DOWN)))
			}
			if (adjacent.left === undefined) stage.setWall(vector, Direction.LEFT, this.WallType)
			if (adjacent.right === undefined) stage.setWall(vector, Direction.RIGHT, this.WallType)
			if (adjacent.up === undefined) stage.setWall(vector, Direction.UP, this.WallType)
			if (adjacent.down === undefined) stage.setWall(vector, Direction.DOWN, this.WallType)
		})
	}
}
