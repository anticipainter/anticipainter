import BaseEvent from "../event.js"

/**
 * Called once per update cycle
 * @event EventUpdate
 */
export default class EventUpdate extends BaseEvent {
	// region Properties
	/**
	 * Time since the last update cycle
	 * @type {number}
	 *
	 * @memberOf event:EventUpdate
	 * @instance
	 */
	deltaTime
	// endregion

	/**
	 * @param {number} deltaTime
	 */
	constructor(deltaTime) {
		super();
		this.deltaTime = deltaTime
	}
}
