import {Vector} from "./vector.js";
import {clamp} from "./util.js";

export class Grid {
	constructor(width=0, height=0) {
		this.size = new Vector(width, height)
		this.map = []
		for (let j = 0; j < this.size.y; j++) {
			this.map.push([])
			for (let i = 0; i < this.size.x; i++) this.map[j][i] = undefined
		}
	}

	setTile(x, y, tile) {
		if (x === typeof Vector) return this.setTile(x.x, x.y, y)
		tile.x = clamp(x, 0, this.size.x)
		tile.y = clamp(y, 0, this.size.y)


	}

	getTile(x, y=0) {
		if (x === typeof Vector) return this.getTile(x.x, x.y)
		return undefined
	}
}