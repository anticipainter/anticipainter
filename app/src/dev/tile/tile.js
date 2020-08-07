import Entity from "../entity/entity.js"
import RenderLayer from "../util/render-layer.js"
import EventBus from "../event/eventbus.js";
import EventTile from "../event/tile/event-tile.js";

/**
 * Abstract Tile class for creating tiles
 * @class Tile
 * @abstract
 */
export default class Tile extends Entity {
	// region Properties
	/**
	 * If this tile is currently activated
	 * @type {boolean}
	 * @protected
	 *
	 * @memberOf Tile
	 * @instance
	 */
	activated = false
	// endregion

	/**
	 * Get the activation state of this {@link Tile}
	 * @returns {boolean}
	 *
	 * @memberOf Tile
	 * @instance
	 */
	getActivated() {
		return this.activated
	}

	/**
	 * Set the activation state of this {@link Tile}
	 * @param {boolean} state
	 *
	 * @memberOf Tile
	 * @instance
	 */
	setActivated(state) {
		if (state === this.activated) return
		this.activated = state
		if (this.activated) this.animFadeIn()
		let event = new EventTile(this)
		EventBus.instance.callEvent(this.activated ? EventBus.listeners.onTilePaintOn : EventBus.listeners.onTilePaintOff, event)
	}

	// region Animations

	/**
	 * Animation for fading this {@link Tile} in
	 *
	 * @memberOf Tile
	 * @instance
	 */
	animFadeIn() {
		this.animate("fadeIn", 500, now => {
			this.sprite.alpha = 0.15 + now * (0.5 - 0.15)
		}, () => {
			this.sprite.alpha = 0.5
		})
	}

	// endregion
	// region Event listeners

	onSpriteCreated() {
		this.sprite.alpha = 0
		this.sprite.scale.set(0)
		this.animate("fadeIn", 500, now => {
			this.sprite.alpha = now * 0.15
			this.sprite.scale.set(now * 64 / 1000)
		}, () => {
			this.sprite.alpha = 0.15
			this.sprite.scale.set(64 / 1000)
		}, 600 * Math.random())
	}

	/**
	 * Called when the {@link Player} is attempting to move over this {@link Tile}
	 * @listens EventPlayerMove
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Tile
	 * @instance
	 */
	onTryPlayerMove(event) {}
	/**
	 * Called when the {@link Player} successfully moves over this {@link Tile}
	 * @listens EventPlayerMove
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Tile
	 * @instance
	 */
	onPlayerMove(event) {
		if (this.activated) return
		this.setActivated(true)
	}

	/**
	 * Called when the {@link Player} is attempting to arrive on this {@link Tile}
	 * @listens EventPlayerMove
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Tile
	 * @instance
	 */
	onTryPlayerArrive(event) {}
	/**
	 * Called when the {@link Player} successfully arrives on this {@link Tile}
	 * @listens EventPlayerMove
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Tile
	 * @instance
	 */
	onPlayerArrive(event) {}

	/**
	 * Called when the {@link Player} is attempting to leave from this {@link Tile}
	 * @listens EventPlayerMove
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Tile
	 * @instance
	 */
	onTryPlayerLeave(event) {}
	/**
	 * Called when the {@link Player} successfully leaves from this {@link Tile}
	 * @listens EventPlayerMove
	 * @param {EventPlayerMove} event
	 *
	 * @memberOf Tile
	 * @instance
	 */
	onPlayerLeave(event) {}

	// endregion

	static getRenderLayer() {
		return RenderLayer.TILE
	}
}
