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
	 * @type {boolean}
	 * @private
	 */
	canceled = false
	/**
	 * The result of this event
	 * @type {Result}
	 * @private
	 */
	result = Result.ALLOW
	/**
	 * A map from [Results]{@link Result} to a list of [EventCallbacks]{@link EventCallback}
	 * @type {Map<Result, EventCallback[]>}
	 * @private
	 */
	callbacks = new Map()
	// endregion

	/**
	 * Determine if this event is cancelable
	 * @returns {boolean}
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	isCancelable() {
		return false
	}

	/**
	 * Determine if this event is canceled and should stop executing
	 * @returns {boolean}
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	isCanceled() {
		return this.canceled
	}

	/**
	 * Sets the cancel state of this event, or errors if unable
	 * @param {boolean} state - new canceled value
	 * @param {Result} [reason=Result.DENY] - reason for the cancellation
	 *
	 * @memberOf BaseEvent
	 * @instance
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
	 * @returns {boolean}
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	hasResult() {
		return false
	}

	/**
	 * Returns the value set as the result of this event
	 * @returns {Result}
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	getResult() {
		return this.result
	}

	/**
	 * Sets the result value for this event
	 * @param {Result} result
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	setResult(result) {
		this.result = result
	}

	/**
	 * Add an {@link EventCallback} for a given {@link Result}
	 * @param {Result} result
	 * @param {EventCallback} callback
	 * @returns {BaseEvent} itself for chaining purposes
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	onResult(result, callback) {
		if (!this.callbacks.has(result)) this.callbacks.set(result, [])
		this.callbacks.get(result).push(callback)
		return this
	}

	/**
	 * Get a list of this [Event]{@link BaseEvent}'s [EventCallbacks]{@link EventCallback} for a given {@link Result}
	 * @returns {EventCallback[]}
	 *
	 * @memberOf BaseEvent
	 * @instance
	 */
	getCallbacks(result) {
		return this.callbacks.get(result)
	}
}

/**
 * The Result enum
 * @class Result
 *
 * @property {Result} ALLOW
 * @property {Result} DENY
 */
export class Result extends Enum {
	static ALLOW = new Result(0, "ALLOW")
	static DENY = new Result(1, "DENY")
}
