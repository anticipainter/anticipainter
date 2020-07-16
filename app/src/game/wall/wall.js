import {Entity} from "../entity.js"
import {Game} from "../game.js"
import {Orientation} from "../util.js"

export class Wall extends Entity {
	orientation = Orientation.HORIZONTAL

	start() {
		super.start()
		this.setOrientation(this.orientation)
		this.updateSpritePos()
		if (this.sprite !== undefined) this.sprite.alpha = 0.5
	}

	update() {
		super.update();
		this.updateSpritePos()
		if (this.sprite !== undefined && this.sprite.alpha < 1) this.sprite.alpha += 0.05
	}

	updateSpritePos() {
		if (this.sprite === undefined) return
		let x = 0, y = 0
		if (this.orientation === Orientation.HORIZONTAL) y = -0.5
		if (this.orientation === Orientation.VERTICAL) x = -0.5

		this.sprite.x = (this.position.x + x) * 64
		this.sprite.y = (this.position.y + y) * 64
	}

	addToGameList() {
		if (this.sprite !== undefined) Game.walls.addChild(this.sprite)
	}

	removeFromGameList() {
		if (this.sprite !== undefined) Game.walls.removeChild(this.sprite)
	}

	setOrientation(orientation) {
		this.orientation = orientation
		// this.sprite.setTexture(Game.resources[this.getLocalRegistryName()])
		// this.sprite.setTexture(PIXI.Texture.from(this.getLocalRegistryName()))
		this.sprite.texture = Game.resources[this.getLocalRegistryName()].texture
	}

	getLocalRegistryName() {
		if (this.orientation === Orientation.HORIZONTAL) return "wall_horizontal"
		if (this.orientation === Orientation.VERTICAL) return "wall_vertical"
	}

	static getRegistryName() {
		return "wall_horizontal"
	}

	static getResourcePath() {
		return "res/drawable/wall_horizontal.svg"
	}

	static getLoadableObject() {
		return [
			{name: "wall_horizontal", url: "res/drawable/wall_horizontal.svg"},
			{name: "wall_vertical", url: "res/drawable/wall_vertical.svg"}
		]
	}
}
