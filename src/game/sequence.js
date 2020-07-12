import {Vector} from "./vector.js"
import {Direction, Orientation} from "./util.js"

export class Sequence {
	static checkWall(grid, position, direction) {
		return grid.getWall(Direction.wallCoordinates(position, direction), Direction.toOrientation(direction)) !== undefined
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
