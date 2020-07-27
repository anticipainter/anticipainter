import Entity from "../entity/entity.js"
import Orientation from "../util/orientation.js"

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

	setOrientation(orientation) {
		this.orientation = orientation
	}

	createSprite() {
		let methods = {
			default: function(entity) {
				entity.sprite.scale.set(0)
				setTimeout(() => {
					entity.animate("scaleIn", 500, now => {
						entity.sprite.scale.set(now * 64 / 1000)
					})
				}, 500 + 600 * Math.random())
			},
			scaleDown: function(entity) {
				entity.sprite.scale.set(2)
				entity.sprite.alpha = 0
				setTimeout(() => {
					entity.animate("scaleIn", 500, now => {
						entity.sprite.scale.set ((2 - 1 * now) * 64 / 1000)
						entity.sprite.alpha = now
					})
				}, 500 + 600 * Math.random())
			},
			wobbleIn: function(entity) {
				entity.sprite.scale.set(0)
				setTimeout(() => {
					entity.animate("scaleIn", 500, now => {
						entity.sprite.scale.set(now * 64 / 1000)
						entity.sprite.anchor.set(1.5 - now, 0.5)
					})
				}, 500 + 600 * Math.random())
			},
			rotateIn: function(entity) {
				let direction = Math.random() < 0.5 ? -1 : 1
				entity.sprite.scale.set(0)
				setTimeout(() => {
					entity.animate("scaleIn", 500, now => {
						entity.sprite.scale.set(now * 64 / 1000)
						entity.sprite.angle = direction * 90 * (1 - now)
					})
				}, 500 + 600 * Math.random())
			}
		}
		super.createSprite();
		methods.default(this)
	}

	updateSprite() {
		if (this.sprite === undefined) return
		let x = Orientation.equal(this.orientation, Orientation.VERTICAL) ? 0.5 : 0
		let y = Orientation.equal(this.orientation, Orientation.HORIZONTAL) ? 0.5 : 0
		this.sprite.x = (this.position.x - x) * 64
		this.sprite.y = (this.position.y - y) * 64
	}


	getRegistryName() {
		if (Orientation.equal(this.orientation, Orientation.VERTICAL)) return "wall_vertical"
		return this.constructor.getRegistryName()
	}
}
