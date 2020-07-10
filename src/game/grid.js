import {Vector} from "./vector.js";
import {clamp, Orientation} from "./util.js";

export class Grid {
	constructor(width = 0, height = 0) {
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
		if (x === typeof Vector) return this.setTile(x.x, x.y, y)
		let tile = new type()
		x = clamp(x, 0, this.size.x)
		y = clamp(y, 0, this.size.y)
		tile.x = x
		tile.y = y
		this.tiles[y][x] = tile
	}

	getTile(x, y) {
		if (x === typeof Vector) return this.getTile(x.x, x.y)
		x = clamp(x, 0, this.size.x)
		y = clamp(y, 0, this.size.y)
		return this.tiles[y][x]
	}

	setWall(x, y, orientation, type) {
		if (x === typeof Vector) return this.setTile(x.x, x.y, y, orientation)
		let wall = new type()
		x = clamp(x, 0, this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0))
		y = clamp(y, 0, this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0))
		wall.x = x
		wall.y = y
		if (orientation === Orientation.VERTICAL) this.verticalWalls[y][x] = wall
		else if (orientation === Orientation.HORIZONTAL) this.horizontalWalls[y][x] = wall
	}

	getWall(x, y, orientation) {
		if (x === typeof Vector) return this.getWall(x.x, x.y, y)
		x = clamp(x, 0, this.size.x + (orientation === Orientation.VERTICAL ? -1 : 0))
		y = clamp(y, 0, this.size.y + (orientation === Orientation.HORIZONTAL ? -1 : 0))
		if (orientation === Orientation.VERTICAL) return this.verticalWalls[y][x]
		else if (orientation === Orientation.HORIZONTAL) return this.horizontalWalls[y][x]
	}
}
