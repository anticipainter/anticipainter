import {Entity} from "./entity.js"
import {Vector} from "./vector.js"
import {Direction, Orientation} from "./util.js"

export class Player extends Entity {
	game = undefined
	currentMove = undefined
	upcomingMoves = []
	lastAttemptedMove = undefined
	lastPosition = undefined
	bonk = false
	lerp = 0

	constructor(game) {
		super()
		this.game = game
	}

	queueMove(move, override = false) {
		if (!this.upcomingMoves.length || override) this.upcomingMoves.push(move)
	}

	checkWall(position, direction) {
		if (direction === Direction.LEFT) return this.game.grid.getWall(position.x, position.y, Orientation.VERTICAL) !== undefined
		if (direction === Direction.RIGHT) return this.game.grid.getWall(position.x + 1, position.y, Orientation.VERTICAL) !== undefined
		if (direction === Direction.UP) return this.game.grid.getWall(position.x, position.y, Orientation.HORIZONTAL) !== undefined
		if (direction === Direction.DOWN) return this.game.grid.getWall(position.x, position.y + 1, Orientation.HORIZONTAL) !== undefined
	}

	update() {
		if (this.currentMove === undefined && this.upcomingMoves.length) {
			this.currentMove = this.upcomingMoves[0]
			this.upcomingMoves.shift()
			this.bonk = this.checkWall(this.position, this.currentMove)
			this.lastAttemptedMove = this.currentMove
			if (!this.bonk) {
				this.lastPosition = this.position
				this.position = Vector.add(this.position, Direction.toVector(this.currentMove))
			}
			this.lerp = 0
		}
		if (this.currentMove !== undefined) {
			this.lerp += 0.2
			let position
			if (this.bonk) {
				let bonkPosition = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove), 0.25))
				if (this.lerp < 0.25) {
					position = Vector.lerp(this.position, bonkPosition, this.lerp / 0.25)
				} else if (this.lerp < 0.75) {
					position = bonkPosition
				} else {
					position = Vector.lerp(bonkPosition, this.position, (this.lerp - 0.75) / 0.25)
				}
			} else {
				position = Vector.lerp(this.lastPosition, this.position, this.lerp)
			}
			this.sprite.x = position.x * 64
			this.sprite.y = position.y * 64
			if (this.lerp >= 1) this.currentMove = undefined
		}
	}

	static getRegistryName() {
		return "player"
	}

	static getResourcePath() {
		return "res/drawable/player.svg"
	}
}
