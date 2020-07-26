import Graphics from "../graphics/graphics.js"
import Vector from "../util/vector.js"

import EventBus from "../event/eventbus.js"
import EventUpdate from "../event/game/event-update.js"
import EventInputKeyDown from "../event/input/event-input-keydown.js"
import EventInputKeyUp from "../event/input/event-input-keyup.js"

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
 */
export default class Entity {
	/**
	 * The position of the entity
	 * @type {Vector}
	 */
	position
	/**
	 * The sprite used to draw to the screen
	 * @type {PIXI.Sprite}
	 */
	sprite

	constructor() {
		this.position = new Vector()

		if (this.onUpdate !== Entity.prototype.onUpdate) EventBus.subscribe(EventUpdate, this.onUpdate.bind(this))
		if (this.onInputKeyDown !== Entity.prototype.onInputKeyDown) EventBus.subscribe(EventInputKeyDown, this.onInputKeyDown.bind(this))
		if (this.onInputKeyUp !== Entity.prototype.onInputKeyUp) EventBus.subscribe(EventInputKeyUp, this.onInputKeyUp.bind(this))
	}

	/**
	 * Generates a new {@link PIXI.Sprite} for this {@link Entity}
	 */
	createSprite() {
		if (this.sprite !== undefined) return
		this.sprite = new PIXI.Sprite(Graphics.getTexture(this))
		this.sprite.width *= 60 / 1000
		this.sprite.height *= 60 / 1000
		this.sprite.anchor.set(0.5, 0.5)
		this.updateSprite()
	}

	/**
	 * Sets the sprite position based on this {@link Entity}'s [position]{@link Vector}
	 */
	updateSprite() {
		if (this.sprite === undefined) return
		this.sprite.x = this.position.x * 64
		this.sprite.y = this.position.y * 64
	}

	/**
	 * Called once every frame
	 * @method onUpdate
	 * @param {EventUpdate} event
	 */
	onUpdate(event) { }

	/**
	 * Called when a key is pressed
	 * @method onInputKeyDown
	 * @param {EventInputKeyDown} event
	 */
	onInputKeyDown(event) { }

	/**
	 * Called when a key is released
	 * @method onInputKeyUp
	 * @param {EventInputKeyUp} event
	 */
	onInputKeyUp(event) { }

	/**
	 * Gets the local registry name of this {@link Entity}
	 * @returns {string}
	 */
	getRegistryName() {
		return this.constructor.getRegistryName()
	}

	/**
	 * Gets the registry name of this {@link Entity}
	 * @method getRegistryName
	 * @returns {string}
	 */
	static getRegistryName() { }

	/**
	 * Gets the resource path of this {@link Entity}
	 * @method getResourcePath
	 * @returns {string}
	 */
	static getResourcePath() { }

	/**
	 * @returns {LoadableObject|LoadableObject[]}
	 */
	static getLoadableObject() {
		return {
			name: this.getRegistryName(),
			url: this.getResourcePath()
		}
	}

	/**
	 * Gets the {@link RenderLayer} of this {@link Entity}
	 */
	static getRenderLayer() { }
}
