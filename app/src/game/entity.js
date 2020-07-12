import {Vector} from "./vector.js"
import {Game} from "./game.js"

export class Entity {
	position = new Vector()

	constructor() {
	}

	start() {
		let registryName = this.constructor.getRegistryName()
		if (registryName === undefined || !(registryName in Game.resources)) return

		this.sprite = new PIXI.Sprite(Game.resources[registryName].texture)
		this.sprite.width *= 64 / 1000
		this.sprite.height *= 64 / 1000
		this.sprite.anchor.set(0.5, 0.5)

		this.addToGameList()
	}

	update() {
		if (this.sprite === undefined) return
		this.sprite.x = this.position.x * 64
		this.sprite.y = this.position.y * 64
	}

	addToGameList() {
		if (this.sprite !== undefined) Game.sprites.addChild(this.sprite)
	}

	removeFromGameList() {
		if (this.sprite !== undefined) Game.sprites.removeChild(this.sprite)
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
