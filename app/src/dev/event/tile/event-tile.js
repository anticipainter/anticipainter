import EventStage from "../stage/event-stage.js"

/**
 * Called when a change is made to a {@link Tile}
 * @event EventTile
 *
 * @param {Stage} stage - reference to the {@link Stage} instance
 * @param {Tile} tile - the {@link Tile} being changed
 */
export default class EventTile extends EventStage {
	// region Properties
	/**
	 * Reference to the {@link Tile} instance
	 * @type {Tile}
	 */
	tile
	// endregion

	/**
	 * @param {Stage} stage
	 * @param {Tile} tile
	 */
	constructor(stage, tile) {
		super(stage)
		this.tile = tile
	}
}
