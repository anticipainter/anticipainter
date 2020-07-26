import EventStage from "../stage/event-stage.js"

export default class EventPlayer extends EventStage {
	/**
	 * Reference to the {@link Player} instance
	 * @property player
	 * @type {Player}
	 */
	player

	/**
	 * @constructor
	 * @param {Stage} stage
	 * @param {Player} player
	 */
	constructor(stage, player) {
		super(stage)
		this.player = player
	}
}
