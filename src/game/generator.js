import {Grid} from "./grid.js";
import {Vector} from "./vector.js";
import {Direction, Orientation} from "./util.js";
import {Tile} from "./tile/tile.js";
import {Tracer} from "./tile/tracer.js";
import {Wall} from "./wall/wall.js";

export class Generator {
	constructor(grid) {
		this.grid = grid
	}

	generate() {
		let start = new Vector(
			Math.floor(Math.random() * this.grid.size.x),
			Math.floor(Math.random() * this.grid.size.y)
		)
		this.grid.setTile(start, new Tile())
		this.grid.setWall(start.x - 1, start.y, Orientation.VERTICAL, new Wall())
		this.grid.setWall(start.x, start.y, Orientation.VERTICAL, new Wall())
		this.grid.setWall(start.x, start.y - 1, Orientation.HORIZONTAL, new Wall())
		this.grid.setWall(start.x, start.y, Orientation.HORIZONTAL, new Wall())

		let base = new Vector(
			Math.floor(Math.random() * this.grid.size.x),
			Math.floor(Math.random() * this.grid.size.y)
		)
		this.grid.setTile(base, new Tracer(Direction.UP))
	}
}
