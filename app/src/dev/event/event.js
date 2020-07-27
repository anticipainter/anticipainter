import Enum from "../util/enum.js"

// Event system inspired by MinecraftForge
// All concepts found here belong to them

/**
 * @callback EventCallback
 */

/**
 * Base Event class from which all other events are derived
 * @class BaseEvent
 * @abstract
 */
export default class BaseEvent {
	// region Properties
	/**
	 * Current cancel state of the event
	 * @property _canceled
	 * @type {boolean}
	 * @private
	 */
	canceled = false
	/**
	 * The result of this event
	 * @property _result
	 * @type {Result}
	 * @private
	 */
	result = Result.DEFAULT
	/**
	 * List of [EventCallbacks]{@link EventCallback} for if [Event]{@link BaseEvent} this succeeds
	 * @property _callbacks
	 * @type {EventCallback[]}
	 * @private
	 */
	callbacks = []
	// endregion

	/**
	 * Determine if this event is cancelable
	 * @method isCancelable
	 * @returns {boolean}
	 */
	isCancelable() {
		return false
	}

	/**
	 * Determine if this event is canceled and should stop executing
	 * @method isCanceled
	 * @returns {boolean}
	 */
	isCanceled() {
		return this.canceled
	}

	/**
	 * Sets the cancel state of this event, or errors if unable
	 * @method setCanceled
	 * @param {boolean} state - new canceled value
	 */
	setCanceled(state) {
		if (!this.isCancelable()) {
			throw new Error(
				"Attempted to call Event#setCanceled() on a non-cancelable event: " +
				this.constructor.name
			)
		}
		this.canceled = state
	}

	/**
	 * Determines if this event expects a significant result value
	 * @method hasResult
	 * @returns {boolean}
	 */
	hasResult() {
		return false
	}

	/**
	 * Returns the value set as the result of this event
	 * @returns {Result}
	 */
	getResult() {
		return this.result
	}

	/**
	 * Sets the result value for this event
	 * @param {Result} result
	 */
	setResult(result) {
		this.result = result
	}

	/**
	 * Add an {@link EventCallback} for if this [Event]{@link BaseEvent} succeeds
	 * @method then
	 * @param {EventCallback} callback
	 */
	then(callback) {
		this.callbacks.push(callback)
	}

	/**
	 * Get a list of this [Event]{@link BaseEvent}'s [EventCallbacks]{@link EventCallback}
	 * @method getCallbacks
	 * @returns {EventCallback[]}
	 */
	getCallbacks() {
		return this.callbacks
	}
}

/**
 * The Result enum
 * @property {Result} DEFAULT
 * @property {Result} DENY
 * @property {Result} ALLOW
 */
export class Result extends Enum {
	static DEFAULT = new Result(0, "DEFAULT")
	static ALLOW = new Result(1, "ALLOW")
	static DENY = new Result(2, "DENY")
}
