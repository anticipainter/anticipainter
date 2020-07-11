import {Tile} from "./tile.js";
import {Direction} from "../util.js";

export class Tracer extends Tile {
	constructor(direction) {
		super()
		this.direction = direction
	}
}
