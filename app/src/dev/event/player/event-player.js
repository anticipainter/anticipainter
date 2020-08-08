import EventStage from "../stage/event-stage.js"

/**
 * Base {@link Player} event
 * @event EventPlayer
 *
 * @param {Stage} stage - reference to the {@link Stage} instance
 * @param {Player} player - reference to the {@link Player} instance
 */
export default class EventPlayer extends EventStage {
	// region Properties
	/**
	 * Reference to the {@link Player} instance
	 * @type {Player}
	 */
	player
	// endregion

	/**
	 * @param {Stage} stage
	 * @param {Player} player
	 */
	constructor(stage, player) {
		super(stage)
		this.player = player
	}
}
