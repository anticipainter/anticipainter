import Entity from "./entity.js"
import RenderLayer from "../util/render-layer.js"
import Graphics from "../graphics/graphics.js";
import Direction from "../util/direction.js";
import Controls from "../input/controls.js";
import Vector from "../util/vector.js";
import EventPlayerMove, {ResultPlayerMove} from "../event/player/event-player-move.js";
import {Result} from "../event/event.js";

export default class Player extends Entity {
	// region Properties
	/**
	 * Reference to the {@link Level} instance
	 * @property leve
	 * @type {Level}
	 */
	level
	/**
	 * The {@link Player}'s different eye visuals
	 * @property eyes
	 * @type {{
	 *  parent: PIXI.Container,
	 *  norm: PIXI.Sprite,
	 *  exec: PIXI.Sprite,
	 *  dead: PIXI.Sprite
	 * }}
	 */
	eyes
	/**
	 * The {@link Player}'s facing direction
	 * @property facing
	 * @type {Direction}
	 */
	facing
	/**
	 * The list of queued moves
	 * @property moveQueue
	 * @type {Direction[]}
	 */
	moveQueue
	/**
	 * If the {@link Player} is currently in the move animation
	 * @property moving
	 * @type {boolean}
	 */
	moving
	// endregion

	/**
	 * @constructor
	 * @param {Level} level
	 */
	constructor(level) {
		super();
		this.level = level
		this.eyes = {}
		this.moveQueue = []
		this.moving = false
	}

	/**
	 * Reference to the current {@link GameMode}
	 * @returns {GameMode}
	 */
	get gameMode() {
		return this.level.gameMode
	}

	queueMove(direction) {
		this.moveQueue.push(direction)
	}

	checkMove() {
		if (this.moving) return
		let direction = this.moveQueue.shift()
		if (direction === undefined) return
		let oldPos = this.position, newPos = Vector.add(this.position, Direction.toVector(direction))
		// let oldDir = this.facing
		this.animRotateEyes(this.facing, direction)
		this.facing = direction
		/** @type {Wall} */
		let wall = this.level.stage.getWall(oldPos, direction)
		/** @type {Tile} */
		let tileA = this.level.stage.getTile(oldPos), tileB = this.level.stage.getTile(newPos)
		let event = new EventPlayerMove(this, direction, this.level.stage)
		if (wall) {
			wall.onPlayerMove(event)
			// tileB = wall.getTile(direction)
		}
		tileA.onPlayerLeave(event)
		if (tileB) tileB.onPlayerArrive(event)
		else event.setCanceled(true)
		let result = event.getResult()
		if (Result.equal(result, Result.DEFAULT)) {
			this.position = newPos
			this.animMove(oldPos, newPos)
		} else if (Result.equal(result, ResultPlayerMove.BONK)) {
			this.animBonk(oldPos, direction)
		}
	}

	// region Animations

	/**
	 * Animates the {@link Player}'s sprite between two [positions]{@link Vector}
	 * @param {Vector} oldPos
	 * @param {Vector} newPos
	 */
	animMove(oldPos, newPos) {
		this.moving = true
		this.animate("move", 80, now => {
			let pos = Vector.lerp(oldPos, newPos, now)
			this.sprite.x = pos.x * 64
			this.sprite.y = pos.y * 64
		}, () => {
			this.moving = false
			this.updateSprite()
		})
	}

	/**
	 * Animates the {@link Player}'s bonk in a {link Direction}
	 * @param {Vector} oldPos
	 * @param {Direction} dir
	 */
	animBonk(oldPos, dir) {
		this.moving = true
		let newPos = Vector.add(oldPos, Vector.mul(Direction.toVector(dir), 0.27))
		let stop = 0.4
		this.animate("bonk", 80, now => {
			let lerp = (now <= stop) ? now / stop :
				(now > stop && now <= 1 - stop) ? 1 : (1 - now) / stop
			let pos = Vector.lerp(oldPos, newPos, lerp)
			this.sprite.x = pos.x * 64
			this.sprite.y = pos.y * 64
		}, () => {
			this.moving = false
			this.sprite.x = oldPos.x * 64
			this.sprite.y = oldPos.y * 64
		})
	}

	/**
	 * Animates the {@link Player}'s eye rotation between two [Directions]{@link Direction}
	 * @param {Direction} oldDir
	 * @param {Direction} newDir
	 */
	animRotateEyes(oldDir, newDir) {
		let dir = 2
		if (Direction.equal(newDir, oldDir)) dir = 0
		else if (Direction.equal(newDir, Direction.leftOf(oldDir))) dir = -1
		else if (Direction.equal(newDir, Direction.rightOf(oldDir))) dir = 1
		this.animate("rotateEyes", 160, now => {
			this.eyes.parent.angle = Direction.toAngle(oldDir) + dir * now * 90
		}, () => {
			this.eyes.parent.angle = Direction.toAngle(newDir)
		})
	}

	/**
	 * Causes the {@link Player} to blink once
	 */
	animBlink() {
		this.animate("blink", 400, now => {
			let stop = 0.4
			let value = (now <= stop) ? now / stop :
				(now > stop && now <= 1 - stop) ? 1 : (1 - now) / stop
			this.eyes.parent.alpha = 1 - value
		})
	}

	// endregion
	// region Events

	onSpriteCreated() {
		this.eyes = {
			parent: new PIXI.Container(),
			norm: new PIXI.Sprite(Graphics.getTextureByRegistry("player_eyes_norm")),
			exec: new PIXI.Sprite(Graphics.getTextureByRegistry("player_eyes_exec")),
			dead: new PIXI.Sprite(Graphics.getTextureByRegistry("player_eyes_dead"))
		}
		this.eyes.norm.anchor.set(0.5, 0.5)
		this.eyes.exec.anchor.set(0.5, 0.5)
		this.eyes.dead.anchor.set(0.5, 0.5)
		this.eyes.exec.alpha = 0
		this.eyes.dead.alpha = 0
		this.eyes.parent.addChild(this.eyes.norm)
		this.eyes.parent.addChild(this.eyes.exec)
		this.eyes.parent.addChild(this.eyes.dead)
		this.sprite.addChild(this.eyes.parent)
		this.sprite.alpha = 0
		this.sprite.scale.set(0)
		setTimeout(() => {
			let angle = Direction.toAngle(this.facing), dir = Math.random() < 0.5 ? -1 : 1
			let hasMoved = false
			// Fade and scale the Player in
			this.animate("fadeIn", 500, now => {
				this.sprite.scale.set(now * 64 / 1000)
				this.sprite.alpha = now
			}, () => {
				this.sprite.scale.set(64 / 1000)
				this.sprite.alpha = 1
			})
			// Rotate eyes into the correct direction
			this.animate("spinEyes", 1000, now => {
				if (this.moving) hasMoved = true
				if (hasMoved) return
				this.eyes.parent.angle = angle + dir * (1 - now) * 360
			}, () => {
				if (hasMoved) return
				this.eyes.parent.angle = angle
				this.animBlink()
			})
		}, 0)
		setInterval(this.animBlink.bind(this), 6000)
	}

	onUpdate(event) {
		this.checkMove()
	}

	onInputKeyDown(event) {
		if (this.moveQueue.length === 0) {
			if (Controls.MOVE_LEFT.includes(event.key)) this.moveQueue.push(Direction.LEFT)
			if (Controls.MOVE_RIGHT.includes(event.key)) this.moveQueue.push(Direction.RIGHT)
			if (Controls.MOVE_UP.includes(event.key)) this.moveQueue.push(Direction.UP)
			if (Controls.MOVE_DOWN.includes(event.key)) this.moveQueue.push(Direction.DOWN)
		}
	}

	// endregion
	// region Registry methods

	static getRegistryName() {
		return "player"
	}

	static getResourcePath() {
		return "../../res/drawable/player.svg"
	}

	static getLoadableObject() {
		return [
			{name: Player.getRegistryName(), url: Player.getResourcePath()},
			{name: "player_eyes_norm", url: "../../res/drawable/player_eyes_norm.svg"},
			{name: "player_eyes_exec", url: "../../res/drawable/player_eyes_exec.svg"},
			{name: "player_eyes_dead", url: "../../res/drawable/player_eyes_dead.svg"}
		]
	}

	// endregion

	static getRenderLayer() {
		return RenderLayer.PLAYER
	}
}
