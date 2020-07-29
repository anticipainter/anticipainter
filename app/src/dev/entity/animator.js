/**
 * Universal ID count for keeping track of [Animators]{@link Animator}
 * @type {number}
 */
let ID_COUNT = 0
/**
 * Universal animation scalar for all [Animators]{@link Animator}
 * @type {number}
 */
let ANIM_SCALE = 0

/**
 * @class Animator
 * @abstract
 */
export default class Animator {
	// region Properties
	/**
	 * The ID of this {@link Entity}
	 * @property id
	 * @type {number}
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
	 */
	get id() {
		return this._id
	}
}
