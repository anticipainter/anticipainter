import BaseEvent from "../event.js"

/**
 * Called when the current {@link Wave} changes
 * @event EventWave
 */
export default class EventWave extends BaseEvent {
	// region Properties
	/**
	 * The {@link Wave} instance
	 * @type {Wave}
	 */
	wave
	// endregion

	/**
	 * @param {Wave} wave
	 */
	constructor(wave) {
		super();
		this.wave = wave
	}
}
