import {Entity} from "../entity.js"
import {Game} from "../game.js";

export class Tile extends Entity {
	image = new Image()
	offset = 50
	activated = false
	valid = false

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
		super.update();
		if (this.valid) {
			let opacity = this.activated ? 0.3 : 1
			if (this.indicator.alpha < opacity) this.indicator.alpha += opacity / 25
		}
		if (this.sprite.alpha < 0.15 && this.frame > this.fadeInOffset) {
			this.sprite.alpha += 0.01
		}
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

	showAsValid() {
		this.valid = true
		this.indicator = new PIXI.Sprite(Game.resources["valid_indicator"].texture)
		this.indicator.anchor.set(0.5, 0.5)
		this.indicator.alpha = 0
		this.sprite.addChild(this.indicator)
	}

	static getRegistryName() {
		return "tile_standard"
	}

	static getResourcePath() {
		return "res/drawable/tile.svg"
	}

	static getLoadableObject() {
		return [
			{name: "tile_standard", url: "res/drawable/tile.svg"},
			{name: "valid_indicator", url: "res/drawable/valid_indicator.svg"}
		]
	}
}
