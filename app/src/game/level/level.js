import Stage, {StageBuilder} from "./stage.js"
import {Vector} from "../vector.js"

/**
 * Abstract level class for creating levels
 * @class Level
 * @abstract
 */
export default class Level {
	/**
	 * The name of the level
	 * @property name
	 * @type {string}
	 */
	name
	/**
	 * The stage containing the grid
	 * @property stage
	 * @type {Stage}
	 */
	stage

	/**
	 * @constructor Level
	 * @param {string} name - The name of the level
	 */
	constructor(name) {
		this.name = name
		this.stage = new Stage()

		let builder = new StageBuilder(this.stage)
		this.generateStage(builder)
		builder.draw()
	}

	/**
	 * Draws the tiles on the grid
	 * @method generateTiles
	 * @abstract
	 * @param {StageBuilder} builder - A grid builder to draw shapes
	 */
	generateStage(builder) {}

	/**
	 * Decides the starting position for the player
	 * @method
	 * @returns {Vector}
	 */
	getStartLocation() {
		while (true) {
			let position = new Vector(
				Math.floor(Math.random() * this.stage.size.x),
				Math.floor(Math.random() * this.stage.size.y)
			)
			if (this.stage.getTile(position) !== undefined) return position
		}
	}

	/**
	 * Runs once the level is loaded
	 * @method start
	 */
	start() {}

	/**
	 * Runs once every frame
	 * @method update
	 */
	update() {}

	/**
	 * The size of the stage
	 * @returns {Vector}
	 */
	get size() {
		return this.stage.size
	}
}
