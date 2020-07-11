import {Entity} from "../entity.js";

export class Tile extends Entity {
	image = new Image()
	offset = 50

	update() {
		super.update();
	}

	static getRegistryName() {
		return "tile_standard"
	}

	static getResourcePath() {
		return "res/drawable/tile.svg"
	}
}
