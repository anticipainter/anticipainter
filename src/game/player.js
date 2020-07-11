import {Entity} from "./entity.js"
import {Vector} from "./vector.js"
import {Direction, Orientation} from "./util.js"

export class Player extends Entity {
	game = undefined
	moveStart = undefined
	currentMove = undefined
	nextMove = undefined

	constructor(game) {
		super()
		this.game = game
	}

	queueMove(move) {
		if (this.nextMove === undefined) this.nextMove = move
	}

	checkWall(position, direction) {
		if (direction === Direction.LEFT) return this.game.grid.getWall(position.x, position.y, Orientation.VERTICAL) !== undefined
		else if (direction === Direction.RIGHT) return this.game.grid.getWall(position.x + 1, position.y, Orientation.VERTICAL) !== undefined
		else if (direction === Direction.UP) return this.game.grid.getWall(position.x, position.y, Orientation.HORIZONTAL) !== undefined
		else if (direction === Direction.DOWN) return this.game.grid.getWall(position.x, position.y + 1, Orientation.HORIZONTAL) !== undefined
	}

	update() {
		if (this.currentMove === undefined && this.nextMove !== undefined) {
			this.currentMove = this.nextMove
			this.moveStart = this.position
			this.nextMove = undefined
		}
		if (this.currentMove !== undefined) {
			if (Vector.equals(this.position, Vector.add(this.moveStart, Direction.toVector(this.currentMove)))) {
				this.currentMove = undefined
			} else if (this.checkWall(this.moveStart, this.currentMove)) {
				this.currentMove = undefined
			} else {
				this.position = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove), 0.2))
				this.position.x = Math.round(this.position.x * 10) * 0.1
				this.position.y = Math.round(this.position.y * 10) * 0.1
			}
		}
		super.update()
	}

	static getRegistryName() {
		return "player"
	}

	static getResourcePath() {
		return "res/drawable/player.svg"
	}
}
