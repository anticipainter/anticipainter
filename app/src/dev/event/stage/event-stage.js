import BaseEvent from "../event.js"

/**
 * Called when a change to the {@link Stage} is made
 * @event EventStage
 *
 * @param {Stage} stage - reference to the {@link Stage} instance
 */
export default class EventStage extends BaseEvent {
	// region Properties
	/**
	 * Reference to the {@link Stage} instance
	 * @type {Stage}
	 */
	stage
	// endregion

	constructor(stage) {
		super()
		this.stage = stage
	}
}
