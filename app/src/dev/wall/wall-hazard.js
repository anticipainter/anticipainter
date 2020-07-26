import Wall from "./wall.js"
import RenderLayer from "../util/render-layer.js"

export default class WallHazard extends Wall {
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
