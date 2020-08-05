import Animator from "./animator.js";
import Graphics from "../graphics/graphics.js"
import Vector from "../util/vector.js"

import EventBus from "../event/eventbus.js"
import EventUpdate from "../event/game/event-update.js"
import EventInputKey from "../event/input/event-input-key.js"

/**
 * Object used to store the name and path for a PIXI resource
 * @typedef LoadableObject
 * @property {string} name
 * @property {string} url
 */

/**
 * Abstract Entity class for creating game entities
 * @class Entity
 * @abstract
 * @extends Animator
 */
export default class Entity extends Animator {

	// region Properties
	/**
	 * The position of the entity
	 * @type {Vector}
	 *
	 * @memberOf Entity
	 * @instance
	 */
	position
	/**
	 * The sprite used to draw to the screen
	 * @type {PIXI.Sprite}
	 *
	 * @memberOf Entity
	 * @instance
	 */
	sprite
	// endregion

	constructor() {
		super()
		this.position = new Vector()

		EventBus.registerEntityEvents(this, Entity)
	}

	/**
	 * Generates a new {@link PIXI.Sprite} for this {@link Entity}
	 *
	 * @memberOf Entity
	 * @instance
	 */
	createSprite() {
		if (this.sprite !== undefined) return
		this.sprite = new PIXI.Sprite(Graphics.getTexture(this))
		this.sprite.width *= 64 / 1000
		this.sprite.height *= 64 / 1000
		this.sprite.anchor.set(0.5, 0.5)
		this.updateSprite()
		this.onSpriteCreated()
	}

	/**
	 * Sets the sprite position based on this {@link Entity}'s [position]{@link Vector}
	 *
	 * @memberOf Entity
	 * @instance
	 */
	updateSprite() {
		if (this.sprite === undefined) return
		this.sprite.x = this.position.x * 64
		this.sprite.y = this.position.y * 64
	}

	// region Event listeners

	/**
	 * Called when this {@link Entity}'s sprite gets created
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onSpriteCreated() {}

	/**
	 * Called once every frame
	 * @listens EventUpdate
	 * @param {EventUpdate} event
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onUpdate(event) {}

	/**
	 * Called when a key is pressed
	 * @listens EventInputKey
	 * @param {EventInputKey} event
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onInputKeyDown(event) {}

	/**
	 * Called when a key is released
	 * @listens EventInputKey
	 * @param {EventInputKey} event
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onInputKeyUp(event) {}

	/**
	 * Called when the [game]{@link Anticipainter} switches to [NORMAL]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onModeNormal(event) {}

	/**
	 * Called when the [game]{@link Anticipainter} switches to [EXECUTE]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onModeExecute(event) {}

	/**
	 * Called when the [game]{@link Anticipainter} switches to [DEATH]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onModeDeath(event) {}

	/**
	 * Called when the [game]{@link Anticipainter} switches to [VICTORY]{@link GameMode} mode
	 * @param {EventMode} event
	 * @listens EventMode
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onModeVictory(event) {}

	/**
	 * Called when a {@link Wave} is about to start
	 * @listens EventWave
	 * @param {EventWave} event
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onWaveStart(event) {}

	/**

	 * Called when a {@link Wave} is about to end
	 * @listens EventWave
	 * @param {EventWave} event
	 *
	 * @memberOf Entity
	 * @instance
	 */
	onWaveEnd(event) {}

	// endregion
	// region Registry methods

	/**
	 * Gets the local registry name of this {@link Entity}
	 * @returns {string}
	 *
	 * @memberOf Entity
	 * @instance
	 */
	getRegistryName() {
		return this.constructor.getRegistryName()
	}

	/**
	 * Gets the registry name of this {@link Entity}
	 * @returns {string}
	 *
	 * @memberOf Entity
	 */
	static getRegistryName() { }

	/**
	 * Gets the resource path of this {@link Entity}
	 * @returns {string}
	 *
	 * @memberOf Entity
	 */
	static getResourcePath() { }

	/**
	 * Gets a {@link LoadableObject} for this {@link Entity}
	 * @returns {LoadableObject|LoadableObject[]}
	 *
	 * @memberOf Entity
	 */
	static getLoadableObject() {
		return {
			name: this.getRegistryName(),
			url: this.getResourcePath()
		}
	}

	// endregion

	/**
	 * Gets the {@link RenderLayer} of this {@link Entity}
	 * @returns {RenderLayer}
	 *
	 * @memberOf Entity
	 */
	static getRenderLayer() {}
}
