import GameMode from "../util/game-mode.js"
import Stage from "./stage.js"
import StageBuilder from "./builder/builder-stage.js"
import Player from "../entity/player.js"
import Vector from "../util/vector.js"
import MazeBuilder from "./builder/builder-maze.js"
import WallStandard from "../wall/wall-standard.js"
import Direction from "../util/direction.js";

/**
 * Abstract level class for creating levels
 * @class Level
 * @abstract
 */
export default class Level {
	// region Properties
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
	// endregion

	/**
	 * @constructor Level
	 * @param {Anticipainter} game - Reference to the game instance
	 */
	constructor(game) {
		this.gameMode = GameMode.WAITING
		this.stage = new Stage()

		let stageBuilder = new StageBuilder(this.stage)
		this.generateStage(stageBuilder)
		stageBuilder.draw()
		let mazeBuilder = new MazeBuilder(this.stage, stageBuilder.getOrigin())
		this.generateMaze(mazeBuilder)
		mazeBuilder.draw()
		console.log(this)

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

	/**
	 * Runs once the {@link Level} is loaded
	 * @method start
	 */
	start() {}

	/**
	 * Runs once every frame
	 * @method update
	 */
	update() {}

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
