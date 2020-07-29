import Entity from "../entity/entity.js"
import Orientation from "../util/orientation.js"
import {ResultPlayerMove} from "../event/player/event-player-move.js";
import Direction from "../util/direction.js";
import Vector from "../util/vector.js";

/**
 * Abstract Wall class for creating walls
 * @class Wall
 * @abstract
 */
export default class Wall extends Entity {
	// region Properties
	/**
	 * The {@link Orientation} of the {@link Wall}
	 * @type {Orientation}
	 */
	orientation
	// endregion

	/**
	 * Sets the {@link Orientation} of this {@link Tile}
	 * @param {Orientation} orientation
	 */
	setOrientation(orientation) {
		this.orientation = orientation
	}

	/**
	 * Gets the [position]{@link Vector} of the {@link Tile} on one side of this {@link Wall}
	 * @param {Direction} direction
	 */
	getWallPos(direction) {
		if (!Orientation.equal(Direction.toOrientation(direction), this.orientation)) return
		if (Direction.equal(direction, Direction.LEFT)) return Vector.add(this.position, Vector.left)
		if (Direction.equal(direction, Direction.RIGHT)) return this.position
		if (Direction.equal(direction, Direction.UP)) return Vector.add(this.position, Vector.up)
		if (Direction.equal(direction, Direction.DOWN)) return this.position
	}

	updateSprite() {
		if (this.sprite === undefined) return
		let x = Orientation.equal(this.orientation, Orientation.VERTICAL) ? 0.5 : 0
		let y = Orientation.equal(this.orientation, Orientation.HORIZONTAL) ? 0.5 : 0
		this.sprite.x = (this.position.x - x) * 64
		this.sprite.y = (this.position.y - y) * 64
	}

	onSpriteCreated() {
		let horizontal = Orientation.equal(this.orientation, Orientation.HORIZONTAL)
		this.sprite.scale.set(horizontal ? 0 : 64 / 1000, horizontal ? 64 / 1000 : 0)
		this.animate("scaleIn", 500, now => {
			this.sprite.scale.set(
				64 / 1000 * (horizontal ? now : 1),
				64 / 1000 * (horizontal ? 1 : now))
		}, () => {
			this.sprite.scale.set(64 / 1000)
		}, 500 + 600 * Math.random())
	}

	/**
	 * Called when the {@link Player} is attempting to move through this {@link Wall}
	 * @listens {@link EventPlayerMove}
	 * @param {EventPlayerMove} event
	 */
	onPlayerMove(event) {
		event.setCanceled(true)
		event.setResult(ResultPlayerMove.BONK)
	}

	getRegistryName() {
		if (Orientation.equal(this.orientation, Orientation.VERTICAL)) return "wall_vertical"
		return this.constructor.getRegistryName()
	}
}
