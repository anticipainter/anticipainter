import {Vector} from "./vector.js";
import {Game} from "./game.js";

export class Entity {
	position = new Vector()

	constructor() {
	}

	start() {
		Game.entities.push(this)

		let registryName = this.constructor.getRegistryName()
		if (registryName === undefined || !(registryName in Game.resources)) return

		this.sprite = new PIXI.Sprite(Game.resources[registryName].texture)
		this.sprite.width = 64
		this.sprite.height = 64

		Game.sprites.addChild(this.sprite)
	}

	update() {
		if (this.sprite === undefined) return
		this.sprite.x = this.position.x * 64
		this.sprite.y = this.position.y * 64
	}

	static getRegistryName() {
		return undefined
	}

	static getResourcePath() {
		return undefined
	}

	static getLoadableObject() {
		return {
			name: this.getRegistryName(),
			url: this.getResourcePath()
		}
	}
}
