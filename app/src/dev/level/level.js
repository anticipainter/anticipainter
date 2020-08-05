import Animator from "../entity/animator.js";
import GameMode from "../util/game-mode.js"
import Stage from "./stage.js"
import TileBuilder from "./builder/builder-tiles.js"
import Player from "../entity/player.js"
import Vector from "../util/vector.js"
import WallBuilder from "./builder/builder-walls.js"
import WallStandard from "../wall/wall-standard.js"
import Direction from "../util/direction.js";
import {Result} from "../event/event.js";
import {ResultPlayerMove} from "../event/player/event-player-move.js";
import EventMode from "../event/game/event-mode.js";
import Entity from "../entity/entity.js";

/**
 * Abstract level class for creating levels
 * @class Level
 * @abstract
 * @extends Animator
 *
 * @param {Anticipainter} game - Reference to the game instance
 */
export default class Level extends Animator {
	// region Properties
	/**
	 * Reference to the [game]{@link Anticipainter} instance
	 * @type {Anticipainter}
	 *
	 * @memberOf Level
	 * @instance
	 */
	game
	/**
	 * The current {@link GameMode}
	 * @type {GameMode}
	 *
	 * @memberOf Level
	 * @instance
	 */
	gameMode
	/**
	 * Contains the [tiles]{@link Tile} and [walls]{@link Wall}
	 * @type {Stage}
	 *
	 * @memberOf Level
	 * @instance
	 */
	stage
	/**
	 * The {@link Player} instance
	 * @type {Player}
	 *
	 * @memberOf Level
	 * @instance
	 */
	player
	/**
	 * Intensity of the screen shake when the {@link Player} moves
	 * @type {number}
	 *
	 * @memberOf Level
	 * @instance
	 */
	screenShakeIntensity = 3
	/**
	 * Intensity of the screen shake when the {@link Player} bonks
	 * @type {number}
	 *
	 * @memberOf Level
	 * @instance
	 */
	screenShakeIntensityBonk = 10
	// endregion

	constructor(game) {
		super()
		this.game = game
		this.gameMode = GameMode.WAITING
		this.stage = new Stage()

		let stageBuilder = new TileBuilder(this.stage)
		this.generateStage(stageBuilder)
		stageBuilder.draw()
		let mazeBuilder = new WallBuilder(this.stage, stageBuilder.getOrigin())
		this.generateMaze(mazeBuilder)
		mazeBuilder.draw()

		this.spawnPlayer()
	}

	/**
	 * The name of the {@link Level}
	 * @abstract
	 * @type {string}
	 *
	 * @memberOf Level
	 * @instance
	 */
	get name() {}

	/**
	 * Draws the [Tiles]{@link Tile} to the {@link Stage} using a [builder]{@link TileBuilder}
	 * @abstract
	 * @param {TileBuilder} builder - A grid builder to draw shapes
	 *
	 * @memberOf Level
	 * @instance
	 */
	generateStage(builder) {}

	/**
	 * Draws the [Walls]{@link Wall} to the {@link Stage} using a [builder]{@link WallBuilder}
	 * @param {WallBuilder} builder
	 *
	 * @memberOf Level
	 * @instance
	 */
	generateMaze(builder) {
		// builder.queueBorder(WallStandard)
		builder.queueMaze(WallStandard)
	}

	/**
	 * Decides the starting [position]{@link Vector} for the {@link Player}
	 * @returns {Vector}
	 *
	 * @memberOf Level
	 * @instance
	 */
	getStartPosition() {
		while (true) {
			let position = new Vector(
				Math.floor(Math.random() * this.stage.size.x),
				Math.floor(Math.random() * this.stage.size.y)
			)
			if (this.stage.getTile(position) !== undefined) return position
		}
	}

	/**
	 * Decided the starting {@link Direction} for the {@link Player}
	 * @returns {Direction}
	 *
	 * @memberOf Level
	 * @instance
	 */
	getStartDirection() {
		return Direction.random()
	}

	/**
	 * Spawns the player into the {@link Level}
	 *
	 * @memberOf Level
	 * @instance
	 */
	spawnPlayer() {
		this.player = new Player(this)
		this.player.position = this.getStartPosition()
		this.player.facing = this.getStartDirection()
	}

	/**
	 * Sets the {@link GameMode} of the {@link Level}
	 * @param gameMode
	 * @fires EventMode
	 *
	 * @memberOf Level
	 * @instance
	 */
	setGameMode(gameMode) {
		if (GameMode.equal(gameMode, this.gameMode)) return
		this.gameMode = gameMode
		let event = new EventMode()
		if (GameMode.equal(this.gameMode, GameMode.NORMAl)) this.game.eventBus.callEvent(Entity.listeners.onModeNormal, event)
		if (GameMode.equal(this.gameMode, GameMode.EXECUTION)) this.game.eventBus.callEvent(Entity.listeners.onModeExecute, event)
		if (GameMode.equal(this.gameMode, GameMode.DEATH)) this.game.eventBus.callEvent(Entity.listeners.onModeDeath, event)
		if (GameMode.equal(this.gameMode, GameMode.VICTORY)) this.game.eventBus.callEvent(Entity.listeners.onModeVictory, event)
	}

	// region Animations

	/**
	 * Animation for shaking the screen
	 * @param {Vector} start
	 * @param {Vector} target
	 * @param {number} [delay=0]
	 *
	 * @memberOf Level
	 * @instance
	 */
	animShake(start, target, delay=0) {
		this.animate("shakeMove", 80, now => {
			let lerp = now < 0.5 ? now : 1 - now
			let pos = Vector.lerp(start, target, 1 - Math.pow(lerp - 1, 2))
			this.game.graphics.sprites.pivot.set(pos.x, pos.y)
		}, () => {
			this.game.graphics.sprites.pivot.set(0, 0)
		}, delay)
	}

	/**
	 * Animation for shaking the screen for a move
	 * @param {Direction} direction
	 *
	 * @memberOf Level
	 * @instance
	 */
	animShakeMove(direction) {
		let start = Vector.zero
		let target = Vector.mul(Direction.toVector(direction), this.screenShakeIntensity)
		this.animShake(start, target)
	}

	/**
	 * Animation for shaking the screen for a bonk
	 * @param {Direction} direction
	 *
	 * @memberOf Level
	 * @instance
	 */
	animShakeBonk(direction) {
		let start = Vector.zero
		let target = Vector.mul(Direction.toVector(Direction.inverse(direction)), this.screenShakeIntensityBonk)
		this.animShake(start, target, 20)
	}

	// endregion
	// region Events

	/**
	 * Runs once the {@link Level} is loaded
	 * @param {EventStart} event
	 * @listens EventStart
	 *
	 * @memberOf Level
	 * @instance
	 */
	onStart(event) {}

	/**
	 * Called once every frame
	 * @param {EventUpdate} event
	 * @listens EventStart
	 *
	 * @memberOf Level
	 * @instance
	 */
	onUpdate(event) {}

	/**
	 * Called when the {@link Player} is attempting to move
	 * @listens {@link EventPlayerMove}
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Level
	 * @instance
	 */
	onPlayerMove(event) {
		event.onResult(Result.ALLOW, () => {
			this.animShakeMove(event.direction)
		}).onResult(ResultPlayerMove.BONK, () => {
			this.animShakeBonk(event.direction)
		})
	}

	// endregion

	/**
	 * The size of the {@link Stage}
	 * @type {Vector}
	 *
	 * @memberOf Level
	 * @instance
	 */
	get size() {
		return this.stage.size
	}

	debug() {
		let s = ""
		for (let y = 0; y < this.stage.size.y; y++) {
			for (let x = 0; x < this.stage.size.x; x++) {
				if (this.stage.getTile(new Vector(x, y)) !== undefined) s += "[]"
				else s += "  "
			}
			s += '\n'
		}
		console.info(s)
	}
}
