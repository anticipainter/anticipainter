import EventBus from "../event/eventbus.js";
import Sequence from "../progression/sequence.js";

/**
 * Abstract {@link Wave} class for creating [Waves]{@link Wave}
 * @class Wave
 * @abstract
 */
export default class Wave {
	constructor() {
		EventBus.subscribeEntityEvents(this, Wave)
	}

	/**
	 * Gets the starting distance of the next {@link Sequence}
	 * @abstract
	 * @returns {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getScanDistance() {}

	/**
	 * Gets the length of the next {@link Sequence}
	 * @abstract
	 * @returns {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceLength() {}

	/**
	 * Gets the time between this {@link Sequence} and the next
	 * @abstract
	 * @returns {number} time in seconds before next {@link Sequence}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceInterval() {}

	/**
	 * Gets the time between moves in a {@link Sequence}
	 * @returns {number}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getSequenceTiming() {
		return 0;
	}

	/**
	 * Gets the {@link Wall} type at a given location
	 * @abstract
	 * @param {Vector} position
	 * @param {Direction} direction
	 * @returns {Class<Wall>} {@link Wall} type at a given location
	 *
	 * @memberOf Wave
	 * @instance
	 */
	getWallTypeAt(position, direction) {}

	/**
	 * Make a new {@link Sequence} using this {@link Wave}'s settings
	 * @returns {Sequence} a valid {@link Sequence}
	 *
	 * @memberOf Wave
	 * @instance
	 */
	makeSequence() {
		return new Sequence()
	}

	// region Events

	/**
	 * Called once every frame
	 * @listens EventUpdate
	 * @param {EventUpdate} event
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onUpdate(event) {}
	/**
	 * Called when a key is pressed
	 * @listens EventInputKey
	 * @param {EventInputKey} event
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onInputKeyDown(event) {}
	/**
	 * Called when a key is released
	 * @listens EventInputKey
	 * @param {EventInputKey} event
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onInputKeyUp(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [NORMAL]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onModeNormal(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [EXECUTE]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onModeExecute(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [DEATH]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onModeDeath(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [VICTORY]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onModeVictory(event) {}
	/**
	 * Called when this {@link Wave} is about to start
	 * @listens EventWave
	 * @param {EventWave} event
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onWaveStart(event) {}
	/**

	 * Called when this {@link Wave} is about to end
	 * @listens EventWave
	 * @param {EventWave} event
	 *
	 * @memberOf Wave
	 * @instance
	 */
	onWaveEnd(event) {}

	// endregion
}
