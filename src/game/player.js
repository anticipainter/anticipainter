import {Entity} from "./entity.js"
import {Vector} from "./vector.js"
import {Direction} from "./util.js"

export class Player extends Entity {
	moveStart = undefined
	currentMove = undefined
	nextMove = undefined

	queueMove(move) {
		if (this.nextMove === undefined) this.nextMove = move
	}

	update() {
		if (this.currentMove === undefined && this.nextMove !== undefined) {
			this.currentMove = this.nextMove
			this.moveStart = this.position
			this.nextMove = undefined
		}
		if (this.currentMove !== undefined) {
			console.log(this.position)
			if (Vector.equals(this.position, Vector.add(this.moveStart, Direction.toVector(this.currentMove)))) {
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
