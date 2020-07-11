import {Entity} from "../entity.js"

export class Tile extends Entity {
	image = new Image()
	offset = 50
	activated = false

	start() {
		super.start();
		this.sprite.alpha = 0.15
	}

	update() {
		super.update();
		if (this.activated && this.sprite.alpha < 0.5) {
			this.sprite.alpha += 0.05
		}
	}

	activate() {
		this.activated = true
	}

	static getRegistryName() {
		return "tile_standard"
	}

	static getResourcePath() {
		return "res/drawable/tile.svg"
	}
}
