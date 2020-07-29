import GameModule from "../game-module.js"

/**
 * @callback EventListener
 * @param {BaseEvent} event
 */
/**
 * @typedef ListenerID
 * @type {number}
 */

/**
 * Current number of listener IDs
 * @property listenerCount
 * @type {number}
 */
let listenerCount = 0

/**
 *
 */
export default class EventBus extends GameModule {
	/**
	 * EventBus singleton instance
	 * @type {EventBus}
	 * @private
	 */
	static instance

	// region Properties
	/**
	 * A map from [ListenerIDs]{@link ListenerID} to an array of [EventListeners]{@link EventListener}
	 * @property events
	 * @type {Map<ListenerID, EventListener[]>}
	 * @private
	 */
	events
	// endregion

	constructor(game) {
		if (EventBus.instance !== undefined) return
		super(game)
		EventBus.instance = this

		this.events = new Map()
		for (let i = 0; i < listenerCount; i++) EventBus.instance.events.set(i, [])
	}

	/**
	 * Run through a list of [EventListeners]{@link EventListener}
	 * @param {ListenerID} listenerID
	 * @param {BaseEvent} event
	 */
	callEvent(listenerID, event) {
		let listeners = this.events.get(listenerID)
		if (listeners === undefined) return
		for (let i = 0; i < listeners.length; i++) {
			if (event.isCanceled()) break
			listeners[i](event)
		}
		if (event.isCanceled()) return
		// let callbacks = event.getCallbacks()
		// for (let callback of callbacks) callback()
	}

	/**
	 * Run all of the [EventCallbacks]{@link EventCallback} associated with the {@BaseEvent}'s {@link Result}
	 * @param {BaseEvent} event
	 */
	static executeEvent(event) {
		let callbacks = event.getCallbacks(event.getResult())
		for (let callback of callbacks) callback()
	}

	/**
	 * Create a new listener
	 * @returns {ListenerID} the id of the listener
	 */
	static createListener() {
		return listenerCount++
	}

	/**
	 * Subscribe an [Event]{@link BaseEvent} to the {@link EventBus}
	 * @method subscribe
	 * @param {ListenerID} listenerID
	 * @param {EventListener} listener
	 */
	static subscribe(listenerID, listener) {
		EventBus.instance.events.get(listenerID).push(listener)
	}
}
