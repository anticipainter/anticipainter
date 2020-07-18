import {Entity} from "../entity.js"
import {Game} from "../game.js";

export class Tile extends Entity {
	image = new Image()
	offset = 50
	activated = false

	start() {
		super.start();
		this.sprite.alpha = 0.15
		this.frame = 0
		this.fadeInOffset = 30 * Math.pow(Math.random(), 2)
	}

	fadeIn() {
		this.sprite.alpha = 0
	}

	update() {
		this.frame++
		if (this.sprite.alpha < 0.15 && this.frame > this.fadeInOffset) {
			this.sprite.alpha += 0.01
		}
		super.update();
		if (this.activated && this.sprite.alpha < 0.5) {
			this.sprite.alpha += 0.05
		}
	}

	addToGameList() {
		if (this.sprite !== undefined) Game.tiles.addChild(this.sprite)
	}

	removeFromGameList() {
		if (this.sprite !== undefined) Game.tiles.removeChild(this.sprite)
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
