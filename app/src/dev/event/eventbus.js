import GameModule from "../game-module.js"
import {Result} from "./event.js";

/**
 * @callback EventListener
 * @param {BaseEvent} event
 */
/**
 * @typedef ListenerID
 * @type {number}
 */
/**
 * Interface for implementing default events
 * @typedef IBaseEventListener
 * @interface
 * @property onUpdate
 * @property onInputKeyDown
 * @property onInputKeyUp
 * @property onModeNormal
 * @property onModeExecute
 * @property onModeDeath
 * @property onModeVictory
 * @property onWaveStart
 * @property onWaveEnd
 */

/**
 * Current number of listener IDs
 * @type {number}
 */
let LISTENER_COUNT = 0

/**
 * The EventBus for keeping track and calling [Events]{@link BaseEvent}
 * @class EventBus
 * @extends GameModule
 *
 * @param {Anticipainter} game - Reference to the game instance
 */
export default class EventBus extends GameModule {
	static listeners = {
		onUpdate: EventBus.createListener(),
		onInputKeyDown: EventBus.createListener(),
		onInputKeyUp: EventBus.createListener(),
		onModeNormal: EventBus.createListener(),
		onModeExecute: EventBus.createListener(),
		onModeDeath: EventBus.createListener(),
		onModeVictory: EventBus.createListener(),
		onWaveStart: EventBus.createListener(),
		onWaveEnd: EventBus.createListener()
	}

	/**
	 * EventBus singleton instance
	 * @type {EventBus}
	 * @private
	 */
	static instance

	// region Properties
	/**
	 * A map from [ListenerIDs]{@link ListenerID} to an array of [EventListeners]{@link EventListener}
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
		for (let i = 0; i < LISTENER_COUNT; i++) EventBus.instance.events.set(i, [])
	}

	/**
	 * Run through a list of [EventListeners]{@link EventListener}
	 * @param {ListenerID} listenerID
	 * @param {BaseEvent} event
	 *
	 * @memberOf EventBus
	 * @instance
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
	 *
	 * @memberOf EventBus
	 */
	static executeEvent(event) {
		let callbacks = event.getCallbacks(event.getResult())
		for (let callback of callbacks) callback()
		for (let callback of event.getCallbacks(Result.ANY)) callback()
	}

	/**
	 * Create a new listener
	 * @returns {ListenerID} the id of the listener
	 *
	 * @memberOf EventBus
	 */
	static createListener() {
		return LISTENER_COUNT++
	}

	/**
	 * Subscribe an [Event]{@link BaseEvent} to the {@link EventBus}
	 * @param {ListenerID} listenerID
	 * @param {EventListener} listener
	 *
	 * @memberOf EventBus
	 */
	static subscribe(listenerID, listener) {
		EventBus.instance.events.get(listenerID).push(listener)
	}

	/**
	 * Subscribe an object to all {@link Entity} events if needed
	 * @param {IBaseEventListener} instance
	 * @param {Class} ClassType
	 *
	 * @memberOf EventBus
	 */
	static subscribeEntityEvents(instance, ClassType) {
		if (instance.onUpdate !== ClassType.prototype.onUpdate) EventBus.subscribe(EventBus.listeners.onUpdate, instance.onUpdate.bind(instance))
		if (instance.onInputKeyDown !== ClassType.prototype.onInputKeyDown) EventBus.subscribe(EventBus.listeners.onInputKeyDown, instance.onInputKeyDown.bind(instance))
		if (instance.onInputKeyUp !== ClassType.prototype.onInputKeyUp) EventBus.subscribe(EventBus.listeners.onInputKeyUp, instance.onInputKeyUp.bind(instance))
		if (instance.onModeNormal !== ClassType.prototype.onModeNormal) EventBus.subscribe(EventBus.listeners.onModeNormal, instance.onModeNormal.bind(instance))
		if (instance.onModeExecute !== ClassType.prototype.onModeExecute) EventBus.subscribe(EventBus.listeners.onModeExecute, instance.onModeExecute.bind(instance))
		if (instance.onModeDeath !== ClassType.prototype.onModeDeath) EventBus.subscribe(EventBus.listeners.onModeDeath, instance.onModeDeath.bind(instance))
		if (instance.onModeVictory !== ClassType.prototype.onModeVictory) EventBus.subscribe(EventBus.listeners.onModeVictory, instance.onModeVictory.bind(instance))
		if (instance.onWaveStart !== ClassType.prototype.onWaveStart) EventBus.subscribe(EventBus.listeners.onWaveStart, instance.onWaveStart.bind(instance))
		if (instance.onWaveEnd !== ClassType.prototype.onWaveEnd) EventBus.subscribe(EventBus.listeners.onWaveEnd, instance.onWaveEnd.bind(instance))
	}
}
