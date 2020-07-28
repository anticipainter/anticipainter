import BaseEvent from "../event.js"

export default class EventInputKey extends BaseEvent {
	// region Properties
	/**
	 * The key code that was pressed
	 * @property key
	 * @type {number}
	 */
	key
	/**
	 * If the `shift` key was held
	 * @property shift
	 * @type {boolean}
	 */
	shift
	/**
	 * If the `ctrl` key was held
	 * @property ctrl
	 * @type {boolean}
	 */
	ctrl
	/**
	 * If the `alt` key was held
	 * @property alt
	 * @type {boolean}
	 */
	alt
	/**
	 * If the `meta` key was held
	 * @property meta
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
