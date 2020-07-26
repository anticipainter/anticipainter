import Stage, {StageBuilder} from "./stage.js"
import {Vector} from "../vector.js"

/**
 * Abstract level class for creating levels
 * @class Level
 * @abstract
 */
export default class Level {
	/**
	 * The name of the {@link Level}
	 * @property name
	 * @type {string}
	 */
	name
	/**
	 * Contains the [tiles]{@link Tile} and [walls]{@link Wall}
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
	 * Draws the [tiles]{@link Tile} to the {@link Stage} using a [builder]{@link StageBuilder}
	 * @method generateTiles
	 * @abstract
	 * @param {StageBuilder} builder - A grid builder to draw shapes
	 */
	generateStage(builder) {}

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
		console.log(s)
	}
}
