import {Entity} from "./entity.js"
import {Vector} from "./vector.js"
import {Direction, Orientation} from "./util.js"
import {Hazard} from "./wall/hazard.js";
import {Game} from "./game.js";

export class Player extends Entity {
	game = undefined
	locked = false
	painting = false
	currentMove = undefined
	upcomingMoves = []
	lastAttemptedMove = undefined
	lastPosition = undefined
	bonk = false
	dead = false
	lerp = 0

	constructor(game) {
		super()
		this.game = game
	}

	start() {
		super.start()
		this.eyes = new PIXI.Sprite(Game.resources["player_eyes"].texture)
		this.eyes.anchor.set(0.5, 0.5)
		this.eyesLast = Direction.UP
		this.eyesAngle = 0
		this.eyesSpeed = 10
		this.sprite.addChild(this.eyes)
	}

	startSequence() {
		this.awaitingSequenceStart = true
	}

	endSequence() {
		this.awaitingSequenceEnd = true
	}

	queueMove(move, override = false) {
		if (this.dead) return
		if ((!this.upcomingMoves.length && !this.locked) || override) this.upcomingMoves.push(move)
	}

	checkWall(position, direction) {
		return this.game.grid.getWall(Direction.wallCoordinates(position, direction), Direction.toOrientation(direction)) !== undefined
	}

	checkHazard(position, direction) {
		let wall = this.game.grid.getWall(Direction.wallCoordinates(position, direction), Direction.toOrientation(direction))
		if (wall === undefined) return false
		return (wall instanceof Hazard)
	}

	update() {
		if (this.dead) {
			this.updateEyes()
			let deadPosition = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove), 0.25))
			let position = Vector.lerp(this.position, deadPosition, this.lerp / 0.25)
			if (this.lerp > 1) {
				this.game.gameOver()
			} else if (this.lerp >= 0.5) {
				this.lerp += 0.01
				this.sprite.alpha = 2 - 2 * this.lerp
			} else this.lerp += 0.2
			this.sprite.x = position.x * 64
			this.sprite.y = position.y * 64
			return
		}
		if (this.awaitingSequenceStart) {
			this.locked = true
			this.painting = true
			this.awaitingSequenceStart = false
		}
		if (!this.upcomingMoves.length && this.awaitingSequenceEnd) {
			this.locked = false
			this.painting = false
			this.awaitingSequenceEnd = false
		}
		if (this.currentMove === undefined && this.upcomingMoves.length) {
			this.currentMove = this.upcomingMoves[0]
			this.upcomingMoves.shift()
			this.setEyes()
			this.lastAttemptedMove = this.currentMove
			if (this.painting) this.game.grid.getTile(this.position.getRounded()).activate()
			this.dead = this.checkHazard(this.position, this.currentMove)
			if (this.dead) {
				this.lerp = 0
				// this.lastAttemptedMove = undefined
				return
			}
			this.bonk = this.checkWall(this.position, this.currentMove)
			if (!this.bonk) {
				this.lastPosition = this.position
				this.position = Vector.add(this.position, Direction.toVector(this.currentMove))
			}
			if (this.painting) this.game.grid.getTile(this.position.getRounded()).activate()
			if (!this.dead) this.lerp = 0
		}
		if (this.currentMove !== undefined) {
			this.lerp += 0.2
			let position
			if (this.dead) {
				// let deadPosition = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove), 0.25))
				// position = Vector.lerp(this.position, deadPosition, this.lerp / 0.25)
				// if (this.lerp >= 0.5 && this.lerp <= 2) {
				// 	this.sprite.alpha = 2 - this.lerp
				// }
			} else if (this.bonk) {
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
		this.updateEyes()
	}

	updateVictory() {
		this.lerp = Math.min(this.lerp + 0.2, 1)
		let position = Vector.lerp(this.lastPosition, this.position, this.lerp)
		this.sprite.x = position.x * 64
		this.sprite.y = position.y * 64
		this.eyes.angle += 15
	}

	areEyesStopped() {
		return this.eyesLast === this.lastAttemptedMove
	}

	setEyes() {
		if (this.lastAttemptedMove === undefined) return
		this.eyesAngle = Direction.toAngle(this.lastAttemptedMove)
		this.eyesLast = this.lastAttemptedMove
		this.eyes.angle = this.eyesAngle
	}

	updateEyes() {
		if (!this.dead) {
			let loop = this.game.frame % 360
			if (loop <= 15) {
				let percent = loop / 15
				if (percent < 0.5) this.eyes.alpha = 1 - 2 * percent
				else this.eyes.alpha = 2 * percent - 1
			}
		}
		if (this.lastAttemptedMove === undefined) return
		if (this.areEyesStopped()) return
		if (this.eyesAngle === Direction.toAngle(this.lastAttemptedMove)) this.eyesLast = this.lastAttemptedMove
		else if (this.eyesLast === Direction.inverse(this.lastAttemptedMove)) this.eyesAngle += this.eyesSpeed * 2
		else if (this.eyesLast === Direction.rightOf(this.lastAttemptedMove)) this.eyesAngle -= this.eyesSpeed
		else if (this.eyesLast === Direction.leftOf(this.lastAttemptedMove)) this.eyesAngle += this.eyesSpeed
		this.eyesAngle = (this.eyesAngle + 360) % 360
		this.eyes.angle = this.eyesAngle
	}

	static getRegistryName() {
		return "player"
	}

	static getResourcePath() {
		return "res/drawable/player.svg"
	}

	static getLoadableObject() {
		return [
			{name: "player", url: "res/drawable/player.svg"},
			{name: "player_eyes", url: "res/drawable/player_eyes.svg"}
		]
	}
}
