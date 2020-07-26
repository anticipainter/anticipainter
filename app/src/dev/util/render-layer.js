import Enum from "./enum.js"

export default class RenderLayer extends Enum {
	static TILE = new RenderLayer(0, "TILE")
	static WALL = new RenderLayer(1, "WALL")
	static HAZARD = new RenderLayer(2, "HAZARD")
	static ALIVE = new RenderLayer(3, "ALIVE")
	static PLAYER = new RenderLayer(4, "PLAYER")

	/**
	 * Gets a list of all [RenderLayers]{@link RenderLayer}
	 * @returns {RenderLayer[]}
	 */
	static all() {
		return [RenderLayer.TILE, RenderLayer.WALL, RenderLayer.HAZARD, RenderLayer.ALIVE, RenderLayer.PLAYER]
	}
}
