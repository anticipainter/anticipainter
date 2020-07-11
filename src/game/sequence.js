import {Vector} from "./vector.js"
import {Direction, Orientation} from "./util.js"

export class Sequence {
	static checkWall(grid, position, direction) {
		if (direction === Direction.LEFT) return grid.getWall(position.x, position.y, Orientation.VERTICAL) !== undefined
		if (direction === Direction.RIGHT) return grid.getWall(position.x + 1, position.y, Orientation.VERTICAL) !== undefined
		if (direction === Direction.UP) return grid.getWall(position.x, position.y, Orientation.HORIZONTAL) !== undefined
		if (direction === Direction.DOWN) return grid.getWall(position.x, position.y + 1, Orientation.HORIZONTAL) !== undefined
	}

	static generate(grid, player, length, scanDistance) {
		let position = player.position
		let sequence = []
		for (let i = 0; i < scanDistance; i++) {
			let direction
			while (Sequence.checkWall(grid, position, direction = Direction.random())) {}
			position = Vector.add(position, Direction.toVector(direction))
		}
		for (let i = 0; i < length; i++) {
			let direction = Direction.random()
			sequence.push(direction)
		}
		return sequence
	}
}
