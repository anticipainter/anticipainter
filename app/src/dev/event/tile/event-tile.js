import EventStage from "../stage/event-stage.js"

export default class EventTile extends EventStage {
	// region Properties
	/**
	 * Reference to the {@link Tile} instance
	 * @property tile
	 * @type {Tile}
	 */
	tile
	// endregion

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
