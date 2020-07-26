import {GameModule} from "../game-module.js"

import EventUpdate from "./game/event-update.js"
import EventInputKeyDown from "./input/event-input-keydown.js"
import EventInputKeyUp from "./input/event-input-keyup.js"

/**
 * @callback EventListener
 * @param {BaseEvent} event
 */

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

	/**
	 * A map from [Events]{@link BaseEvent} to an array of [EventListeners]{@link EventListener}
	 * @property events
	 * @type {Map<BaseEvent, EventListener[]>}
	 * @private
	 */
	events

	constructor(game) {
		if (EventBus.instance !== undefined) return
		super(game)
		EventBus.instance = this

		this.events = new Map([
			[EventUpdate, []],
			[EventInputKeyDown, []],
			[EventInputKeyUp, []]
		])
	}

	/**
	 * Run through a list of [EventListeners]{@link EventListener}
	 * @method _runEvent
	 * @param {BaseEvent} event
	 */
	callEvent(event) {
		let listeners = this.events.get(event.constructor)
		if (listeners === undefined) return
		for (let i = 0; i < listeners.length; i++) {
			if (event.isCanceled()) break
			listeners[i](event)
		}
		if (event.isCanceled()) return
		let callbacks = event.getCallbacks()
		for (let callback of callbacks) callback()
	}

	/**
	 * Subscribe an [Event]{@link BaseEvent} to the {@link EventBus}
	 * @method subscribe
	 * @param {typeof BaseEvent} EventType
	 * @param {EventListener} listener
	 */
	static subscribe(EventType, listener) {
		EventBus.instance.events.get(EventType).push(listener)
	}
}
