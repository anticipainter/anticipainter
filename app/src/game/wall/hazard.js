import {Game} from "../game.js";
import {Orientation} from "../util.js"
import {Wall} from "./wall.js"

export class Hazard extends Wall {
	addToGameList() {
		if (this.sprite !== undefined) Game.hazards.addChild(this.sprite)
	}

	removeFromGameList() {
		if (this.sprite !== undefined) Game.hazards.removeChild(this.sprite)
	}

	getLocalRegistryName() {
		if (this.orientation === Orientation.HORIZONTAL) return "hazard_horizontal"
		if (this.orientation === Orientation.VERTICAL) return "hazard_vertical"
	}

	static getRegistryName() {
		return "hazard_horizontal"
	}

	static getResourcePath() {
		return "res/drawable/hazard_horizontal.svg"
	}

	static getLoadableObject() {
		return [
			{name: "hazard_horizontal", url: "res/drawable/hazard_horizontal.svg"},
			{name: "hazard_vertical", url: "res/drawable/hazard_vertical.svg"}
		]
	}
}
