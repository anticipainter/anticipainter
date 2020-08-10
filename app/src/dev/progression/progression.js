import GameModule from "../game-module.js";
import GameMode from "../util/game-mode.js";
import EventWave from "../event/game/event-wave.js";
import EventBus from "../event/eventbus.js";
import EventCommand from "../event/sequence/event-command.js";

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
	indexWave
	/**
	 * Reference to the current {@link Wave}
	 * @type {Wave}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	currentWave
	/**
	 * Index of the current [move]{@link Direction} in the {@link Wave}
	 * @type {number}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	indexMove
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
	 * The time the next move in the {@link Sequence} should happen
	 * @type {number}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	nextMoveTime
	/**
	 * If the {@link Wave} should change after the current {@link Sequence}
	 * @type {boolean}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	awaitingWaveChange
	/**
	 * If the {@link Player} is currently speeding-up
	 * @type {boolean}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	speedUp
	/**
	 * Time the {@link Player} started speeding up
	 * @type {number}
	 *
	 * @memberOf Progression
	 * @instance
	 */
	speedUpStartTime

	/**
	 * Create a new {@link Progression} module
	 * @param {Level} level
	 * @param {Wave[]} waves
	 */
	constructor(level, waves) {
		super(level.game)
		this.level = level
		this.waves = waves
		this.indexWave = 0
		this.currentWave = this.waves[this.indexWave]
		this.score = {
			count: 0,
			total: this.level.stage.getTileCount()
		}
		this.updateScoreDisplay()
		this.generateSequence()
		this.awaitingWaveChange = false
		this.speedUp = false
	}

	/**
	 * Generates a new {@link Sequence} based of the current {@link Wave}'s attributes
	 *
	 * @memberOf Progression
	 * @instance
	 */
	generateSequence() {
		this.indexMove = 0
		this.sequence = this.currentWave.makeSequence(this.level.stage, this.level.player)
		this.sequence.initialize()
		this.nextMoveTime = this.sequence.timeDelayEnd
		this.game.graphics.display.clearSequence()
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
		if (this.indexWave !== 0 && percent < this.waves[this.indexWave].getThreshold()) {
			this.indexWave--
			this.awaitingWaveChange = true
		} else if (this.indexWave < this.waves.length - 1 && percent >= this.waves[this.indexWave + 1].getThreshold()) {
			this.indexWave++
			this.awaitingWaveChange = true
		}
	}

	/**
	 * Updates the score display to show the current score
	 *
	 * @memberOf Progression
	 * @instance
	 */
	updateScoreDisplay() {
		this.game.graphics.display.setScore(this.score.count, this.score.total)
	}

	// region Events

	onModeNormal(event) {
		if (this.awaitingWaveChange) {
			this.awaitingWaveChange = false
			this.currentWave.onWaveEnd(new EventWave(this.currentWave))
			this.currentWave = this.waves[this.indexWave]
			this.currentWave.onWaveStart(new EventWave(this.currentWave))
		}
	}

	onModeExecute(event) {
		this.game.graphics.display.dimSequence()
	}

	onCommandStart(event) {
		this.level.player.queueMove(event.direction)
		this.game.graphics.display.scaleDirection(event.index, () => {
			this.game.eventBus.callEvent(EventBus.listeners.onCommandEnd, event)
		})
	}

	onCommandEnd(event) {
		if (event.index === event.length - 1) {
			this.generateSequence()
			this.level.setGameMode(GameMode.NORMAL)
		}
	}

	onUpdateNormal(event) {
		let speedUpTime = this.currentWave.getSpeedUpDuration()
		if (this.speedUp) this.nextMoveTime -= (this.sequence.delay - speedUpTime) / speedUpTime * 1000 * event.deltaTime
		if (Date.now() >= this.nextMoveTime) {
			this.level.setGameMode(GameMode.EXECUTION)
		}
		this.game.graphics.display.setTimer((this.nextMoveTime - Date.now()) / 1000, this.sequence.delay / 1000)
	}

	onUpdateExecute(event) {
		let now = Date.now()
		if (now >= this.nextMoveTime) {
			this.nextMoveTime = now + this.currentWave.getSequenceTiming()
			let command = new EventCommand(this.sequence.moves, this.indexMove++)
			this.game.eventBus.callEvent(EventBus.listeners.onCommandStart, command)
		}
		this.game.graphics.display.setTimer(0, 1)
	}

	onTilePaintOn(event) {
		this.score.count++
		this.updateScoreDisplay()
		this.checkWaveChange()
	}

	onTilePaintOff(event) {
		this.score.count--
		this.updateScoreDisplay()
		this.checkWaveChange()
	}

	onInputKeyDown(event) {
		if (event.key === 32) {
			this.speedUp = true
			this.speedUpStartTime = Date.now()
		}
	}

	onInputKeyUp(event) {
		if (event.key === 32) this.speedUp = false
	}

	// endregion
}