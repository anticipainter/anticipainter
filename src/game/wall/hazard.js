import {Wall} from "./wall.js"
import {Orientation} from "../util.js"

export class Hazard extends Wall {
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
