import {Vector} from "./vector.js";
import {clamp, Orientation} from "./util.js";

export class Grid {
	constructor(width=0, height=0) {
		this.size = new Vector(width, height)
		this.tiles = []
		this.verticalWalls = []
		this.horizontalWalls = []
		for (let j = 0; j < this.size.y; j++) {
			this.tiles.push([])
			this.verticalWalls.push([])
			if (j < this.size.y - 1) this.horizontalWalls.push([])
			for (let i = 0; i < this.size.x; i++) {
				this.tiles[j][i] = undefined
				if (i < this.size.x - 1) this.verticalWalls[j][i] = undefined
				if (j < this.size.y - 1) this.horizontalWalls[j][i] = undefined
			}
		}
	}

	setTile(x, y, type) {
		let tile = new type();
		if (x === typeof Vector) return this.setTile(x.x, x.y, y)
		tile.x = clamp(x, 0, this.size.x)
		tile.y = clamp(y, 0, this.size.y)
	}

	getTile(x, y=0) {
		if (x === typeof Vector) return this.getTile(x.x, x.y)
		return undefined
	}

	setWall(x, y, orientation, type) {
		let wall = new type();
		if (x === typeof Vector) return this.setTile(x.x, x.y, y, orientation)
		wall.x = clamp(x, 0, this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0))
		wall.y = clamp(y, 0, this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0))
	}

	getWall(x, y, orientation) {
		if (x === typeof Vector) return this.getWall(x.x, x.y, y)
		return undefined
	}
}
