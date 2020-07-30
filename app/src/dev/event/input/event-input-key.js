import BaseEvent from "../event.js"

/**
 * Called when a key is pressed or released
 * @event EventInputKey
 *
 * @param {number} key - the key that was pressed
 * @param {boolean} shift - if the shift key was held
 * @param {boolean} ctrl - if the ctrl key was held
 * @param {boolean} alt - if the alt key was held
 * @param {boolean} meta - if the meta key was held
 */
export default class EventInputKey extends BaseEvent {
	// region Properties
	/**
	 * The key code that was pressed
	 * @type {number}
	 */
	key
	/**
	 * If the `shift` key was held
	 * @type {boolean}
	 */
	shift
	/**
	 * If the `ctrl` key was held
	 * @type {boolean}
	 */
	ctrl
	/**
	 * If the `alt` key was held
	 * @type {boolean}
	 */
	alt
	/**
	 * If the `meta` key was held
	 * @type {boolean}
	 */
	meta
	// endregion

	constructor(key, shift, ctrl, alt, meta) {
		super();
		this.key = key
		this.shift = shift
		this.ctrl = ctrl
		this.alt = alt
		this.meta = meta
	}
}
