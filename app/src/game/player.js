import {Entity} from "./entity.js"
import {Direction} from "./util.js"
import {Game} from "./game.js";
import {Hazard} from "./wall/hazard.js";
import {Vector} from "./vector.js"

class Move {
	constructor(direction, system) {
		this.direction = direction
		this.system = Boolean(system)
	}
}

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
		this.sprite.x = this.position.x * 64
		this.sprite.y = this.position.y * 64
		this.eyes = {
			parent: new PIXI.Container(),
			norm: new PIXI.Sprite(Game.resources["player_eyes_norm"].texture),
			exec: new PIXI.Sprite(Game.resources["player_eyes_exec"].texture),
			dead: new PIXI.Sprite(Game.resources["player_eyes_dead"].texture)
		}
		this.eyes.norm.anchor.set(0.5, 0.5)
		this.eyes.exec.anchor.set(0.5, 0.5)
		this.eyes.dead.anchor.set(0.5, 0.5)
		this.eyes.exec.alpha = 0
		this.eyes.dead.alpha = 0
		this.eyes.parent.addChild(this.eyes.norm)
		this.eyes.parent.addChild(this.eyes.exec)
		this.eyes.parent.addChild(this.eyes.dead)
		this.eyesLast = Direction.UP
		this.eyesAngle = 0
		this.eyesSpeed = 10
		this.sprite.addChild(this.eyes.parent)
		this.audio = {
			move: new Audio("res/sound/move.wav"),
			moveSystem: new Audio("res/sound/move_system.wav"),
			hit: new Audio("res/sound/hit.wav"),
			hitSystem: new Audio("res/sound/hit_system.wav"),
			die: new Audio("res/sound/die.wav")
		}
	}

	startSequence() {
		this.awaitingSequenceStart = true
	}

	endSequence() {
		this.awaitingSequenceEnd = true
	}

	queueMove(direction, system = false) {
		if (this.dead) return
		if ((!this.upcomingMoves.length && !this.locked) || system) this.upcomingMoves.push(new Move(direction, system))
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
			let deadPosition = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove.direction), 0.25))
			let position = Vector.lerp(this.position, deadPosition, this.lerp / 0.25)
			if (this.lerp > 1) {
				this.game.gameOver()
			} else if (this.lerp >= 0.5) {
				this.setEyesDead()
				this.lerp += 0.01
				this.sprite.alpha = 2 - 2 * this.lerp
			} else this.lerp += 0.2
			this.sprite.x = position.x * 64
			this.sprite.y = position.y * 64
			return
		}
		if (this.awaitingSequenceStart) {
			this.locked = true
			this.awaitingSequenceStart = false
		}
		if (!this.upcomingMoves.length && this.awaitingSequenceEnd) {
			this.locked = false
			this.awaitingSequenceEnd = false
		}
		if (this.currentMove === undefined && this.upcomingMoves.length) {
			this.currentMove = this.upcomingMoves[0]
			this.upcomingMoves.shift()
			this.painting = this.currentMove.system
			this.setEyesAngle()
			this.lastAttemptedMove = this.currentMove
			if (this.painting) this.game.grid.getTile(this.position.getRounded()).activate()
			this.dead = this.checkHazard(this.position, this.currentMove.direction)
			if (this.dead) {
				this.lerp = 0
				this.audio.die.cloneNode().play()
				this.game.showValidTiles()
				// this.lastAttemptedMove = undefined
				return
			}
			this.bonk = this.checkWall(this.position, this.currentMove.direction)
			if (this.currentMove.system) {
				if (this.bonk) this.audio.hitSystem.cloneNode().play()
				else this.audio.moveSystem.cloneNode().play()
			} else {
				let pitchShiftFactor = this.bonk ? 20 : 80
				let audio = (this.bonk ? this.audio.hit : this.audio.move).cloneNode()
				audio.playbackRate = 1 + (Math.random() - 0.5) / pitchShiftFactor
				audio.play()
			}
			if (!this.bonk) {
				this.lastPosition = this.position
				this.position = Vector.add(this.position, Direction.toVector(this.currentMove.direction))
			}
			if (this.painting) this.game.grid.getTile(this.position.getRounded()).activate()
			if (!this.dead) this.lerp = 0
		}
		if (this.currentMove !== undefined) {
			this.lerp += 0.2
			let position
			if (this.dead) {
				// let deadPosition = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove.direction), 0.25))
				// position = Vector.lerp(this.position, deadPosition, this.lerp / 0.25)
				// if (this.lerp >= 0.5 && this.lerp <= 2) {
				// 	this.sprite.alpha = 2 - this.lerp
				// }
			} else if (this.bonk) {
				let bonkPosition = Vector.add(this.position, Vector.mul(Direction.toVector(this.currentMove.direction), 0.25))
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
		this.eyes.parent.angle += 15
	}

	areEyesStopped() {
		return this.eyesLast === this.lastAttemptedMove.direction
	}

	setEyesAngle() {
		if (this.lastAttemptedMove === undefined) return
		this.eyesAngle = Direction.toAngle(this.lastAttemptedMove.direction)
		this.eyesLast = this.lastAttemptedMove.direction
		this.eyes.parent.angle = this.eyesAngle
	}

	setEyesNorm() {
		if (this.dead) return
		this.eyes.norm.alpha = 1
		this.eyes.exec.alpha = 0
	}

	setEyesExec() {
		if (this.dead) return
		this.eyes.norm.alpha = 0
		this.eyes.exec.alpha = 1
	}

	setEyesDead() {
		this.eyes.norm.alpha = 0
		this.eyes.exec.alpha = 0
		this.eyes.dead.alpha = 1
	}

	updateEyes() {
		if (!this.dead) {
			let loop = this.game.frame % 360
			if (loop <= 15) {
				let percent = loop / 15
				if (percent < 0.5) this.eyes.parent.alpha = 1 - 2 * percent
				else this.eyes.parent.alpha = 2 * percent - 1
			}
		}
		if (this.lastAttemptedMove === undefined) return
		if (this.areEyesStopped()) return
		if (this.eyesAngle === Direction.toAngle(this.lastAttemptedMove.direction)) this.eyesLast = this.lastAttemptedMove
		else if (this.eyesLast === Direction.inverse(this.lastAttemptedMove.direction)) this.eyesAngle += this.eyesSpeed * 2
		else if (this.eyesLast === Direction.rightOf(this.lastAttemptedMove.direction)) this.eyesAngle -= this.eyesSpeed
		else if (this.eyesLast === Direction.leftOf(this.lastAttemptedMove.direction)) this.eyesAngle += this.eyesSpeed
		this.eyesAngle = (this.eyesAngle + 360) % 360
		this.eyes.parent.angle = this.eyesAngle
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
			{name: "player_eyes_norm", url: "res/drawable/player_eyes_norm.svg"},
			{name: "player_eyes_exec", url: "res/drawable/player_eyes_exec.svg"},
			{name: "player_eyes_dead", url: "res/drawable/player_eyes_dead.svg"}
		]
	}
}
