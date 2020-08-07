import GameModule from "../game-module.js";
import GameMode from "../util/game-mode.js";

/**
 * The progression module
 * @class Progression
 * @extends GameModule
 * @extends GameObject
 *
 * @param {Level} level - Reference to the level instance
 * @param {Wave[]} waves - List of [Waves]{@link Wave}
 */
export default class Progression extends GameModule {
	/**
	 * Reference to the {@link Level} instance
	 * @type {Level}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	level
	/**
	 * Container for all of the [Waves]{@link Wave}
	 * @type {Wave[]}
	 *
	 * @memberOf WaveBuilder
	 * @instance
	 * @readonly
	 * @private
	 */
	waves
	/**
	 * Index of the current {@link Wave}
	 * @type {number}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	index
	/**
	 * Object for keeping track of the score
	 * @type {{total: number, count: number}}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	score
	/**
	 * Current {@link Sequence}
	 * @type {Sequence}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	sequence

	/**
	 * Create a new {@link Progression} module
	 * @param {Level} level
	 * @param {Wave[]} waves
	 */
	constructor(level, waves) {
		super(level.game)
		this.level = level
		this.waves = waves
		this.index = 0
		this.score = {
			count: 0,
			total: this.level.stage.getTileCount()
		}
		this.sequence = this.waves[0].makeSequence(this.level.stage, this.level.player)
		this.sequence.initialize()
		this.game.graphics.display.showSequence(this.sequence)
	}

	/**
	 * Checks for if the {@link Wave} should change based on the fill percent
	 *
	 * @memberOf Progression
	 * @instance
	 */
	checkWaveChange() {
		let percent = this.score.count / this.score.total
		if (this.index !== 0 && percent < this.waves[this.index].getThreshold()) {
			this.index--
		} else if (this.index < this.waves.length - 1 && percent >= this.waves[this.index + 1].getThreshold()) {
			this.index++
		}
	}

	// region Events

	onUpdate(event) {
		this.game.graphics.display.setTimer((this.sequence.timeStart - Date.now()) / 1000, 5)
	}

	onUpdateNormal(event) {
		let now = Date.now()
		if (now >= this.sequence.timeStart) {
			this.level.setGameMode(GameMode.EXECUTION)
			this.game.graphics.display.dimSequence()
		}
	}

	onUpdateExecute(event) {
		// TODO completely redo
		let tempTime = 15
		this.onUpdateExecute.timeout = this.onUpdateExecute.timeout || tempTime
		this.onUpdateExecute.timeout--
		if (this.onUpdateExecute.timeout === 0) {
			let move = this.sequence.moves.shift()
			this.level.player.queueMove(move)
			this.game.graphics.display.scaleDirection(this.sequence.length - this.sequence.moves.length - 1)
			this.onUpdateExecute.timeout = tempTime
			if (this.sequence.moves.length === 0) {
				this.sequence = this.waves[0].makeSequence(this.level.stage, this.level.player)
				this.sequence.initialize()
				this.level.setGameMode(GameMode.NORMAl)
				this.game.graphics.display.clearSequence()
				this.game.graphics.display.showSequence(this.sequence)
			}
		}
	}

	onTilePaintOn(event) {
		this.score.count++
		this.checkWaveChange()
	}

	onTilePaintOff(event) {
		this.score.count--
		this.checkWaveChange()
	}

	// endregion
}