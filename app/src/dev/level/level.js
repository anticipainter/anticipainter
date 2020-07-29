import Animator from "../entity/animator.js";
import GameMode from "../util/game-mode.js"
import Stage from "./stage.js"
import StageBuilder from "./builder/builder-stage.js"
import Player from "../entity/player.js"
import Vector from "../util/vector.js"
import MazeBuilder from "./builder/builder-maze.js"
import WallStandard from "../wall/wall-standard.js"
import Direction from "../util/direction.js";
import {Result} from "../event/event.js";
import {ResultPlayerMove} from "../event/player/event-player-move.js";

/**
 * Abstract level class for creating levels
 * @class Level
 * @abstract
 */
export default class Level extends Animator {
	// region Properties
	/**
	 * Reference to the [game]{@link Anticipainter} instance
	 * @property game
	 * @type {Anticipainter}
	 */
	game
	/**
	 * The current {@link GameMode}
	 * @property gameMode
	 * @type {GameMode}
	 */
	gameMode
	/**
	 * Contains the [tiles]{@link Tile} and [walls]{@link Wall}
	 * @property stage
	 * @type {Stage}
	 */
	stage
	/**
	 * The {@link Player} instance
	 * @property player
	 * @type {Player}
	 */
	player
	/**
	 * Intensity of the screen shake when the {@link Player} moves
	 * @property screenShakeIntensity
	 * @type {number}
	 */
	screenShakeIntensity = 3
	/**
	 * Intensity of the screen shake when the {@link Player} bonks
	 * @property screenShakeIntensity
	 * @type {number}
	 */
	screenShakeIntensityBonk = 10
	// endregion

	/**
	 * @constructor Level
	 * @param {Anticipainter} game - Reference to the game instance
	 */
	constructor(game) {
		super()
		this.game = game
		this.gameMode = GameMode.WAITING
		this.stage = new Stage()

		let stageBuilder = new StageBuilder(this.stage)
		this.generateStage(stageBuilder)
		stageBuilder.draw()
		let mazeBuilder = new MazeBuilder(this.stage, stageBuilder.getOrigin())
		this.generateMaze(mazeBuilder)
		mazeBuilder.draw()

		this.spawnPlayer()
	}

	/**
	 * The name of the {@link Level}
	 * @abstract
	 * @returns {string}
	 */
	get name() {}

	/**
	 * Draws the [tiles]{@link Tile} to the {@link Stage} using a [builder]{@link StageBuilder}
	 * @method generateTiles
	 * @abstract
	 * @param {StageBuilder} builder - A grid builder to draw shapes
	 */
	generateStage(builder) {}

	generateMaze(builder) {
		// builder.queueBorder(WallStandard)
		builder.queueMaze(WallStandard)
	}

	/**
	 * Decides the starting [position]{@link Vector} for the {@link Player}
	 * @method
	 * @returns {Vector}
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
	 */
	getStartDirection() {
		return Direction.random()
	}

	/**
	 * Spawns the player into the {@link Level}
	 */
	spawnPlayer() {
		this.player = new Player(this)
		this.player.position = this.getStartPosition()
		this.player.facing = this.getStartDirection()
	}

	// region Animations

	animShake(start, target) {
		this.animate("shakeMove", 80, now => {
			let lerp = now < 0.5 ? now : 1 - now
			let pos = Vector.lerp(start, target, 1 - Math.pow(lerp - 1, 2))
			this.game.graphics.sprites.pivot.set(pos.x, pos.y)
		}, () => {
			this.game.graphics.sprites.pivot.set(0, 0)
		})
	}

	animShakeMove(direction) {
		let start = Vector.zero
		let target = Vector.mul(Direction.toVector(direction), this.screenShakeIntensity)
		this.animShake(start, target)
	}

	animShakeBonk(direction) {
		let start = Vector.zero
		let target = Vector.mul(Direction.toVector(Direction.inverse(direction)), this.screenShakeIntensityBonk)
		this.animShake(start, target)
	}

	// endregion
	// region Events

	/**
	 * Runs once the {@link Level} is loaded
	 * @method start
	 */
	onStart() {}

	/**
	 * Called once every frame
	 * @method onUpdate
	 * @param {EventUpdate} event
	 */
	onUpdate(event) {}

	/**
	 * Called when the {@link Player} is attempting to move
	 * @listens {@link EventPlayerMove}
	 * @param {EventPlayerMove} event
	 */
	onPlayerMove(event) {
		let result = event.getResult()
		if (Result.equal(result, Result.DEFAULT)) this.animShakeMove(event.direction)
		else if (Result.equal(result, ResultPlayerMove.BONK)) this.animShakeBonk(event.direction)
	}

	// endregion

	/**
	 * The size of the {@link Stage}
	 * @returns {Vector}
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
