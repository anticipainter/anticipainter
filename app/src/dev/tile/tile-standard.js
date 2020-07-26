import Tile from "./tile.js"

export default class TileStandard extends Tile {
	constructor() {
		super();
	}

	static getRegistryName() {
		return "tile_standard"
	}

	static getResourcePath() {
		return "../../res/drawable/tile.svg"
	}
}
