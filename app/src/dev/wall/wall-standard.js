import Wall from "./wall.js"
import RenderLayer from "../util/render-layer.js"

/**
 * Standard {@link Wall} class
 * @class WallStandard
 * @extends Wall
 *
 * @memberOf Wall
 * @inner
 */
export default class WallStandard extends Wall {
	static getRenderLayer() {
		return RenderLayer.WALL
	}

	static getRegistryName() {
		return "wall_horizontal"
	}

	static getResourcePath() {
		return "../../res/drawable/wall_horizontal.svg"
	}

	static getLoadableObject() {
		return [
			{name: WallStandard.getRegistryName(), url: WallStandard.getResourcePath()},
			{name: "wall_vertical", url: "../../res/drawable/wall_vertical.svg"}
		]
	}
}
