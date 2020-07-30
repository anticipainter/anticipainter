import Enum from "./enum.js"

/**
 * The RenderLayer enum
 * @class RenderLayer
 * @extends Enum
 */
export default class RenderLayer extends Enum {
	/**
	 * The TILE {@link RenderLayer}
	 * @type {RenderLayer}
	 * @constant
	 *
	 * @memberOf RenderLayer
	 */
	static TILE = new RenderLayer(0, "TILE")
	/**
	 * The WALL {@link RenderLayer}
	 * @type {RenderLayer}
	 * @constant
	 *
	 * @memberOf RenderLayer
	 */
	static WALL = new RenderLayer(1, "WALL")
	/**
	 * The HAZARD {@link RenderLayer}
	 * @type {RenderLayer}
	 * @constant
	 *
	 * @memberOf RenderLayer
	 */
	static HAZARD = new RenderLayer(2, "HAZARD")
	/**
	 * The ALIVE {@link RenderLayer}
	 * @type {RenderLayer}
	 * @constant
	 *
	 * @memberOf RenderLayer
	 */
	static ALIVE = new RenderLayer(3, "ALIVE")
	/**
	 * The PLAYER {@link RenderLayer}
	 * @type {RenderLayer}
	 * @constant
	 *
	 * @memberOf RenderLayer
	 */
	static PLAYER = new RenderLayer(4, "PLAYER")

	/**
	 * Gets a list of all [RenderLayers]{@link RenderLayer}
	 * @returns {RenderLayer[]}
	 *
	 * @memberOf RenderLayer
	 */
	static all() {
		return [RenderLayer.TILE, RenderLayer.WALL, RenderLayer.HAZARD, RenderLayer.ALIVE, RenderLayer.PLAYER]
	}
}
