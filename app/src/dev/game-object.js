import Anticipainter from "./anticipainter.js";
import EventBus from "./event/eventbus.js";

/**
 * Universal ID count for keeping track of [GameObjects]{@link GameObject}
 * @type {number}
 */
let ID_COUNT = 0
/**
 * Universal animation scalar for all [GameObjects]{@link GameObject}
 * @type {number}
 */
let ANIM_SCALE = 1

/**
 * Abstract class for any object in the game
 * @class GameObject
 * @abstract
 */
export default class GameObject {
	// region Properties
	/**
	 * The ID of this {@link GameObject}
	 * @type {number}
	 *
	 * @memberOf GameObject
	 * @private
	 */
	_id = ID_COUNT++
	// endregion

	/**
	 * Starts an animation for this {@link GameObject}
	 * @param {string} label - name of the animation
	 * @param {number} duration - length of the animation
	 * @param {function} step - Called at each frame of the animation
	 * @param {function} [complete] - Called at the end of the animation
	 * @param {number} [delay=0] - Delay until the animation starts
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	animate(label, duration, step, complete, delay=0) {
		if (Anticipainter.frozen || ANIM_SCALE === 0) {
			if (complete) complete()
			return
		}
		if (delay !== 0) {
			setTimeout(() => {this.animate(label, duration, step, complete)}, delay * ANIM_SCALE)
			return
		}
		let tag = `object-${this.id}-${label}`
		let start = {}, end = {}
		start[tag] = 0
		end[tag] = 1
		let options = {duration : duration * ANIM_SCALE, step: step}
		if (complete) options.complete = complete
		$(start).animate(end, options)
	}

	/**
	 * The ID of this {@link GameObject}
	 * @returns {number}
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	get id() {
		return this._id
	}

	// region Events

	/**
	 * Called once every frame
	 * @listens EventUpdate
	 * @param {EventUpdate} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onUpdate(event) {}
	/**
	 * Called when a key is pressed
	 * @listens EventInputKey
	 * @param {EventInputKey} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onInputKeyDown(event) {}
	/**
	 * Called when a key is released
	 * @listens EventInputKey
	 * @param {EventInputKey} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onInputKeyUp(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [NORMAL]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onModeNormal(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [EXECUTE]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onModeExecute(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [DEATH]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onModeDeath(event) {}
	/**
	 * Called when the [game]{@link Anticipainter} switches to [VICTORY]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onModeVictory(event) {}
	/**
	 * Called when a {@link Wave} is about to start
	 * @listens EventWave
	 * @param {EventWave} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onWaveStart(event) {}
	/**
	 * Called when a {@link Wave} is about to end
	 * @listens EventWave
	 * @param {EventWave} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onWaveEnd(event) {}
	/**
	 * Called when a {@link Tile} is painted
	 * @listens EventTile
	 * @param {EventTile} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onTilePaintOn(event) {}
	/**
	 * Called when a {@link Tile} is un-painted
	 * @listens EventTile
	 * @param {EventTile} event
	 *
	 * @memberOf GameObject
	 * @instance
	 */
	onTilePaintOff(event) {}

	// endregion

	/**
	 * Subscribe to all {@link GameObject} events if needed
	 * @param {GameObject} instance
	 *
	 * @memberOf GameObject
	 */
	static subscribeEvents(instance) {
		EventBus.subscribeBaseEvents(instance, GameObject)
	}
}