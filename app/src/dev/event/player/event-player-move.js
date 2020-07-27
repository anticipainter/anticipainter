import EventPlayer from "./event-player.js"
import Direction from "../../util/direction.js"

/**
 * @event EventPlayerMove - Called when the {@link Player} moves anywhere
 */
export default class EventPlayerMove extends EventPlayer {
	// region Properties
	/**
	 * Desired {@link Direction} of the movement
	 * @property direction
	 * @type {Direction}
	 */
	direction
	// endregion

	/**
	 * @constructor
	 * @param {Stage} stage
	 * @param {Player} player
	 * @param {Direction} direction
	 */
	constructor(player, direction, stage) {
		super(stage, player)
		this.stage = stage
		this.player = player
		this.direction = direction
	}

	isCancelable() {
		return true
	}
}
