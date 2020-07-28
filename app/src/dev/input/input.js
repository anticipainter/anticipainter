import GameModule from "../game-module.js";
import EventInputKey from "../event/input/event-input-key.js";
import Entity from "../entity/entity.js";

export default class Input extends GameModule {
	/**
	 * The list of keys currently being pressed
	 * @property keys
	 * @type {Set<number>}
	 * @private
	 */
	keys

	constructor(game) {
		super(game);
		this.keys = new Set()
		$(document).on("keydown", e => {
			if (!this.keys.has(e.keyCode)) {
				this.keys.add(e.keyCode)
				let event = new EventInputKey(e.keyCode, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
				this.game.eventBus.callEvent(Entity.listeners.onInputKeyDown, event)
			}
		})
		$(document).on("keyup", e => {
			if (this.keys.has(e.keyCode)) {
				this.keys.delete(e.keyCode)
				let event = new EventInputKey(e.keyCode, e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
				this.game.eventBus.callEvent(Entity.listeners.onInputKeyUp, event)
			}
		})
	}
}