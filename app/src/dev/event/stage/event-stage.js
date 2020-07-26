import BaseEvent from "../event.js"

export default class EventStage extends BaseEvent {
	/**
	 * Reference to the {@link Stage} instance
	 * @property stage
	 * @type {Stage}
	 */
	stage

	/**
	 * @constructor
	 * @param {Stage} stage
	 */
	constructor(stage) {
		super()
		this.stage = stage
	}
}
