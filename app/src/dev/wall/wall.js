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
		super.createSprite();
		let horizontal = Orientation.equal(this.orientation, Orientation.HORIZONTAL)
		this.sprite.scale.set(horizontal ? 0 : 64 / 1000, horizontal ? 64 / 1000 : 0)
		setTimeout(() => {
			this.animate("scaleIn", 500, now => {
				this.sprite.scale.set(
					64 / 1000 * (horizontal ? now : 1),
					64 / 1000 * (horizontal ? 1 : now))
			})
		}, 500 + 600 * Math.random())
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
