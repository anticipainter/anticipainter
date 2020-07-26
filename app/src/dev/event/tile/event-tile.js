import EventStage from "../stage/event-stage.js"

export default class EventTile extends EventStage {
	/**
	 * Reference to the {@link Tile} instance
	 * @property tile
	 * @type {Tile}
	 */
	tile

	/**
	 * @constructor
	 * @param {Stage} stage
	 * @param {Tile} tile
	 */
	constructor(stage, tile) {
		super(stage)
		this.tile = tile
	}
}
