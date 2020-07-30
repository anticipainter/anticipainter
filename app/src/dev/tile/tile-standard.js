import Tile from "./tile.js"

/**
 * Standard {@link Tile} class
 * @class TileStandard
 * @extends Tile
 *
 * @memberOf Tile
 * @inner
 */
export default class TileStandard extends Tile {
	static getRegistryName() {
		return "tile_standard"
	}

	static getResourcePath() {
		return "../../res/drawable/tile.svg"
	}
}
