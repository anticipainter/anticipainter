/**
 * Universal ID count for keeping track of [Animators]{@link Animator}
 * @type {number}
 */
let ID_COUNT = 0
/**
 * Universal animation scalar for all [Animators]{@link Animator}
 * @type {number}
 */
let ANIM_SCALE = 1

/**
 * Abstract class for an object that can run animations
 * @class Animator
 */
export default class Animator {
	// region Properties
	/**
	 * The ID of this {@link Entity}
	 * @type {number}
	 *
	 * @memberOf Animator
	 * @private
	 */
	_id
	// endregion

	constructor() {
		this._id = ID_COUNT++
	}

	/**
	 * Starts an animation for this {@link Animator}
	 * @param {string} label - name of the animation
	 * @param {number} duration - length of the animation
	 * @param {function} step - Called at each frame of the animation
	 * @param {function} [complete] - Called at the end of the animation
	 * @param {number} [delay=0] - Delay until the animation starts
	 *
	 * @memberOf Animator
	 * @instance
	 */
	animate(label, duration, step, complete, delay=0) {
		if (ANIM_SCALE === 0) {
			if (complete) complete()
			return
		}
		if (delay !== 0) {
			setTimeout(() => {this.animate(label, duration, step, complete)}, delay * ANIM_SCALE)
			return
		}
		let tag = `entity-${this.id}-${label}`
		let start = {}, end = {}
		start[tag] = 0
		end[tag] = 1
		let options = {duration : duration * ANIM_SCALE, step: step}
		if (complete) options.complete = complete
		$(start).animate(end, options)
	}

	/**
	 * The ID of this {@link Animator}
	 * @returns {number}
	 *
	 * @memberOf Animator
	 * @instance
	 */
	get id() {
		return this._id
	}
}
