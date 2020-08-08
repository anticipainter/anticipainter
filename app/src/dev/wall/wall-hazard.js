import Wall from "./wall.js"
import RenderLayer from "../util/render-layer.js"
import Orientation from "../util/orientation.js";

/**
 * Hazard {@link Wall} class
 * @class WallHazard
 * @extends Wall
 *
 * @memberOf Wall
 * @inner
 */
export default class WallHazard extends Wall {
	getRegistryName() {
		if (Orientation.equal(this.orientation, Orientation.VERTICAL)) return "hazard_vertical"
		return this.constructor.getRegistryName()
	}

	static getRenderLayer() {
		return RenderLayer.HAZARD
	}

	static getRegistryName() {
		return "hazard_horizontal"
	}

	static getResourcePath() {
		return "../../res/drawable/hazard_horizontal.svg"
	}

	static getLoadableObject() {
		return [
			{name: WallHazard.getRegistryName(), url: WallHazard.getResourcePath()},
			{name: "hazard_vertical", url: "../../res/drawable/hazard_vertical.svg"}
		]
	}
}
