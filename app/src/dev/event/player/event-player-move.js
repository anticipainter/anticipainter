import EventPlayer from "./event-player.js"
import Direction from "../../util/direction.js"
import {Result} from "../event.js";

/**
 * Called when the {@link Player} moves anywhere
 * @event EventPlayerMove
 *
 * @param {Player} player - reference to the {@link Player} instance
 * @param {Direction} direction - {@link Direction} the move was in
 * @param {Stage} stage - reference to the {@link Stage} instance
 */
export default class EventPlayerMove extends EventPlayer {
	// region Properties
	/**
	 * Desired {@link Direction} of the movement
	 * @type {Direction}
	 */
	direction
	// endregion

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

/**
 * Result for a player movement
 * @class ResultPlayerMove
 * @extends Result
 * @memberOf Result
 * @inner
 */
export class ResultPlayerMove extends Result {
	static BONK = new ResultPlayerMove(3, "BONK")
	static DIE = new ResultPlayerMove(4, "DIE")
}
