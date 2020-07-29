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
	 * @property canceled
	 * @type {boolean}
	 * @private
	 */
	canceled = false
	/**
	 * The result of this event
	 * @property result
	 * @type {Result}
	 * @private
	 */
	result = Result.ALLOW
	/**
	 * A map from [Results]{@link Result} to a list of [EventCallbacks]{@link EventCallback}
	 * @property callbacks
	 * @type {Map<Result, EventCallback[]>}
	 * @private
	 */
	callbacks = new Map()
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
	 * @param {Result} [reason=Result.DENY] - reason for the cancellation
	 */
	setCanceled(state, reason=Result.DENY) {
		if (!this.isCancelable()) {
			throw new Error(
				"Attempted to call Event#setCanceled() on a non-cancelable event: " +
				this.constructor.name
			)
		}
		this.canceled = state
		this.setResult(reason)
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
	 * Add an {@link EventCallback} for a given {@link Result}
	 * @method then
	 * @param {Result} result
	 * @param {EventCallback} callback
	 * @returns {BaseEvent} itself for chaining purposes
	 */
	onResult(result, callback) {
		if (!this.callbacks.has(result)) this.callbacks.set(result, [])
		this.callbacks.get(result).push(callback)
		return this
	}

	/**
	 * Get a list of this [Event]{@link BaseEvent}'s [EventCallbacks]{@link EventCallback} for a given {@link Result}
	 * @method getCallbacks
	 * @returns {EventCallback[]}
	 */
	getCallbacks(result) {
		return this.callbacks.get(result)
	}
}

/**
 * The Result enum
 * @property {Result} ALLOW
 * @property {Result} DENY
 */
export class Result extends Enum {
	static ALLOW = new Result(0, "ALLOW")
	static DENY = new Result(1, "DENY")
}
