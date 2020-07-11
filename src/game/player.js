import {Entity} from "./entity.js";

export class Player extends Entity {
	static getRegistryName() {
		return "player"
	}

	static getResourcePath() {
		return "res/drawable/player.svg"
	}
}
